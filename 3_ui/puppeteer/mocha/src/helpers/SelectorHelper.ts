import {ElementHandle} from 'puppeteer';
import {page} from '../core/puppeteer/Runner';

export interface IRootEl {
    readonly selector: string;
    readonly isCollection?: boolean;
}

interface IElementHandler {
    readonly $: () => Promise<ElementHandle | null>;
    readonly $$: () => Promise<ElementHandle[]>;
    readonly selector: (params?: TParams, parents?: number) => Promise<string>;
}

type TParams = 'index' | 'attributes';

/**
 * This function for getting selector from ElementHandle
 *
 * E.g.:
 * 1. getSelectorFromElementHandle(element, 'index') --> div > form > label:nth-child(2) > input
 *
 * 2. getSelectorFromElementHandle(element, 'attributes') -->
 *
 * div[data-js-login-login-subpage].login-login-subpage >
 * form.login-form.rp-form[data-js-login-login-form] > label.rp-field >
 * input[type='text'].rp-input[placeholder='Login'][data-js-login][value='default'][maxlength='128']
 *
 */
function getSelectorFromElementHandle(element: ElementHandle, params: TParams = 'index', parents = 3): Promise<string> {
    return element.evaluate(
        (_elem: any, _params: TParams, _parents: number) => {

            const root: { name: string, attrs: string }[] = [];
            let j = 0;

            function retrieveNodeNameAndAttributes(node: any) {
                let output = '';
                const nodeName = node.nodeName.toLowerCase();

                switch (_params) {
                    case 'index':
                        const childNodesArr = Array.from(node.parentNode.children);
                        const necessaryChildNodes = childNodesArr.filter((n: any) => n.nodeName.toLowerCase() === nodeName);

                        if (necessaryChildNodes.length > 1) {
                            const index = childNodesArr.indexOf(node) + 1;
                            output = `:nth-child(${index})`;
                        }
                        break;
                    case 'attributes':
                        if (node.hasAttributes()) {
                            const attrs = node.attributes;
                            for (const {value, name} of attrs) {
                                if (value) {
                                    switch (name) {
                                        case 'id':
                                            output += /:/.test(value) ? `[id='${value}']` : `#${value}`;
                                            break;
                                        case 'class':
                                            output += `.${value.split(/\s+\b/).join('.')}`;
                                            break;
                                        default:
                                            output += `[${name}='${value}']`;
                                            break;
                                    }
                                } else {
                                    output += `[${name}]`;
                                }
                            }
                        }
                        break;
                }

                root.push({name: nodeName, attrs: output});

                // Taking only 3 parent if you need more then change 'parents' value.
                if (j >= _parents || nodeName === 'body') {
                    return;
                } else {
                    j++;
                    retrieveNodeNameAndAttributes(node.parentNode);
                }
            }

            retrieveNodeNameAndAttributes(_elem);

            return root.reverse().map(({name, attrs}) => name + attrs).join(' > ');
        },
        params,
        parents
    );
}

/**
 * This function is necessary to concatenate selectors within a constructor.
 */
export const $ = (rootEl: IRootEl | string, child: string): IRootEl => {
    const parent = typeof rootEl === 'string' ? rootEl : rootEl.selector;
    return {
        selector: parent + ' ' + child
    };
};

// todo add arrays + optimize
export const elementHandler = (child: IRootEl | ElementHandle, parent?: IRootEl | ElementHandle): IElementHandler => {

    return {
        async $() {
            if (instanceOfElementHandle(child)) {
                if (parent) {
                    const selectorChild = await getSelectorFromElementHandle(child, 'index', 5);

                    if (instanceOfElementHandle(parent)) {
                        const el = await parent;
                        return el.$(selectorChild);
                    }

                    if (parent.isCollection) {
                        const [el] = await page.$$(parent.selector);
                        return el.$(selectorChild);
                    }

                    const element = await page.$(parent.selector);
                    return element!.$(selectorChild);
                }
                return child;

            } else {
                if (parent) {
                    if (instanceOfElementHandle(parent)) {
                        const el = await parent;
                        return el.$(child.selector);
                    }

                    if (parent.isCollection) {
                        const [el] = await page.$$(parent.selector);
                        return el.$(child.selector);
                    }

                    const element = await page.$(parent.selector);
                    return element!.$(child.selector);
                }

                return page.$(child.selector);
            }
        },
        async $$() {
            if (instanceOfElementHandle(child)) {
                const selectorChild = await getSelectorFromElementHandle(child, 'index', 5);

                if (parent) {

                    if (instanceOfElementHandle(parent)) {
                        const el = await parent;
                        return el.$$(selectorChild);
                    }

                    if (parent.isCollection) {
                        const [el] = await page.$$(parent.selector);
                        return el.$$(selectorChild);
                    }

                    const element = await page.$(parent.selector);
                    return element!.$$(selectorChild);
                }
                return page.$$(selectorChild);
            } else {
                if (parent) {
                    if (instanceOfElementHandle(parent)) {
                        const el = await parent;
                        return el.$$(child.selector);
                    }

                    if (parent.isCollection) {
                        const [el] = await page.$$(parent.selector);
                        return el.$$(child.selector);
                    }

                    const element = await page.$(parent.selector);
                    return element!.$$(child.selector);
                }

                return page.$$(child.selector);
            }
        },
        async selector(params: TParams = 'index', parents = 5) {

            if (instanceOfElementHandle(child) && (parent && instanceOfElementHandle(parent))) {
                const selectorChild = await getSelectorFromElementHandle(child, params, parents);
                const selectorParent = await getSelectorFromElementHandle(parent, params, parents);
                return selectorParent + ' ' + selectorChild;
            } else if (!instanceOfElementHandle(child) && (parent && instanceOfElementHandle(parent))) {
                const selectorParent = await getSelectorFromElementHandle(parent, params, parents);
                return selectorParent + ' ' + child.selector;
            } else if (instanceOfElementHandle(child) && (parent && !instanceOfElementHandle(parent))) {
                const selectorChild = await getSelectorFromElementHandle(child, params, parents);
                return parent!.selector + ' ' + selectorChild;
            } else if (instanceOfElementHandle(child) && !parent) {
                return getSelectorFromElementHandle(child, params, parents);
            } else if (!instanceOfElementHandle(child) && (parent && !instanceOfElementHandle(parent))) {
                return parent.selector + ' ' + child.selector;
            } else if (!instanceOfElementHandle(child) && !parent) {
                return child.selector;
            } else if (instanceOfElementHandle(child)) {
                return getSelectorFromElementHandle(child, params, parents);
            } else {
                return child.selector;
            }
        }
    };
};

function instanceOfElementHandle(object: IRootEl | ElementHandle): object is ElementHandle {
    return '$' in object;
}

