import { KeyInfo } from '@/KeyInfo';
import { keyInfoWithSizeMap } from '@/keyInfoWithSizeMap';

export interface KeyInfoWithSize extends KeyInfo {
  size: number;
};

export interface KeyInfoWithSizeAndLocation extends KeyInfoWithSize {
  x: number;
  y: number;
};

export class EmptySpace {
  constructor(public size: number) { }
}

interface Line {
  height: number;
  items: (string | EmptySpace)[];
}

export const firstLine: Line = {
  height: 1,
  items: [
    'ESC', new EmptySpace(1),
    'F1', 'F2', 'F3', 'F4', new EmptySpace(0.5),
    'F5', 'F6', 'F7', 'F8', new EmptySpace(0.5),
    'F9', 'F10', 'F11', 'F12', new EmptySpace(0.5),
  ],
};

export const secondLine: Line = {
  height: 1,
  items: ['` ~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '- _', '= +', 'BKSP'],
};

export const thridLine: Line = {
  height: 1,
  items: ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[ {', '] }', '\\ |'],
};

export const fourthLine: Line = {
  height: 1,
  items: ['CpsLk', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '; :', '\' "', 'Enter'],
};

export const fifthLine: Line = {
  height: 1,
  items: ['L SH', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ', <', '. >', '/ ?', 'R SH'],
};

export const sixthLine: Line = {
  height: 1,
  items: ['Ctrl', 'Win', 'Alt', 'Spc', 'Alt F9', 'Fn', 'App', 'Alt 2'],
};

const lines: Line[] = [
  firstLine,
  { height: 0.2, items: [] },
  secondLine,
  thridLine,
  fourthLine,
  fifthLine,
  sixthLine,
];


function getKeyboardLayout(): KeyInfoWithSizeAndLocation[] {
  let y = 0;

  return lines.reduce((result: KeyInfoWithSizeAndLocation[], line) => {
    let x = 0;
    const infos = line.items.reduce((prev: KeyInfoWithSizeAndLocation[], item) => {
      if (item instanceof EmptySpace) {
        x += item.size;
        return prev;
      }

      const keyInfoWithSize = Object.values(keyInfoWithSizeMap).find(keyInfo => keyInfo.display === item);
      if (!keyInfoWithSize) {
        throw new Error(`Cannot find keyInfo with size of item ${item}`);
      }
      const ret = [
        ...prev,
        {
          ...keyInfoWithSize,
          x,
          y,
        }
      ];

      x += keyInfoWithSize.size;
      return ret;
    }, []);

    y += line.height;

    return [
      ...result,
      ...infos
    ];
  }, []);
}

export const keyboardLayout = getKeyboardLayout();