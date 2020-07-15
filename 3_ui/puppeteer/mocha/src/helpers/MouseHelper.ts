// https://github.com/GoogleChrome/puppeteer/issues/4378
// https://github.com/GoogleChrome/puppeteer/blob/master/test/assets/input/mouse-helper.js
import {page} from '../core/puppeteer/Runner';

export function getMousePosition() {
    return page.evaluate(() => {
        // Install mouse helper only for top-level frame.
        if (window !== window.parent) {
            return;
        }
        window.addEventListener('DOMContentLoaded', () => {
            const box = document.createElement('div');
            box.classList.add('puppeteer-mouse-pointer');

            const styleElement = document.createElement('style');
            styleElement.innerHTML = `
                .puppeteer-mouse-pointer {
                  pointer-events: none;
                  position: absolute;
                  top: 0;
                  z-index: 10000;
                  left: 0;
                  width: 20px;
                  height: 20px;
                  background: rgba(0,0,0,.4);
                  border: 1px solid white;
                  border-radius: 10px;
                  margin: -10px 0 0 -10px;
                  padding: 0;
                  transition: background .2s, border-radius .2s, border-color .2s;
                }
                .puppeteer-mouse-pointer.button-1 {
                  transition: none;
                  background: rgba(0,0,0,0.9);
                }
                .puppeteer-mouse-pointer.button-2 {
                  transition: none;
                  border-color: rgba(0,0,255,0.9);
                }
                .puppeteer-mouse-pointer.button-3 {
                  transition: none;
                  border-radius: 4px;
                }
                .puppeteer-mouse-pointer.button-4 {
                  transition: none;
                  border-color: rgba(255,0,0,0.9);
                }
                .puppeteer-mouse-pointer.button-5 {
                  transition: none;
                  border-color: rgba(0,255,0,0.9);
                }
            `;

            document.head.appendChild(styleElement);
            document.body.appendChild(box);

            function updateButtons(buttons: number) {
                for (let i = 0; i < 5; i++) {
                    // @ts-ignore
                    // tslint:disable-next-line:no-bitwise
                    box.classList.toggle('button-' + i, buttons & (1 << i)); // todo
                }
            }

            document.addEventListener('mousemove', (event: MouseEvent) => {
                box.style.left = event.pageX + 'px';
                box.style.top = event.pageY + 'px';
                updateButtons(event.buttons);
            }, true);

            document.addEventListener('mousedown', (event: MouseEvent) => {
                updateButtons(event.buttons);
                box.classList.add('button-' + event.which);
            }, true);

            document.addEventListener('mouseup', (event: MouseEvent) => {
                updateButtons(event.buttons);
                box.classList.remove('button-' + event.which);
            }, true);
        }, false);
    });
}
