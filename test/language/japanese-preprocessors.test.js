/*
 * Copyright (C) 2024  Yomitan Authors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import {describe, expect, test} from 'vitest';
import {normalizeCombiningCharacters} from '../../ext/js/language/ja/japanese-text-preprocessors.js';

const testCasesDakuten = [
    ['か\u3099', 'が'],
    ['き\u3099', 'ぎ'],
    ['く\u3099', 'ぐ'],
    ['け\u3099', 'げ'],
    ['こ\u3099', 'ご'],
    ['さ\u3099', 'ざ'],
    ['し\u3099', 'じ'],
    ['す\u3099', 'ず'],
    ['せ\u3099', 'ぜ'],
    ['そ\u3099', 'ぞ'],
    ['た\u3099', 'だ'],
    ['ち\u3099', 'ぢ'],
    ['つ\u3099', 'づ'],
    ['て\u3099', 'で'],
    ['と\u3099', 'ど'],
    ['は\u3099', 'ば'],
    ['ひ\u3099', 'び'],
    ['ふ\u3099', 'ぶ'],
    ['へ\u3099', 'べ'],
    ['ほ\u3099', 'ぼ'],
    ['カ\u3099', 'ガ'],
    ['キ\u3099', 'ギ'],
    ['ク\u3099', 'グ'],
    ['ケ\u3099', 'ゲ'],
    ['コ\u3099', 'ゴ'],
    ['サ\u3099', 'ザ'],
    ['シ\u3099', 'ジ'],
    ['ス\u3099', 'ズ'],
    ['セ\u3099', 'ゼ'],
    ['ソ\u3099', 'ゾ'],
    ['タ\u3099', 'ダ'],
    ['チ\u3099', 'ヂ'],
    ['ツ\u3099', 'ヅ'],
    ['テ\u3099', 'デ'],
    ['ト\u3099', 'ド'],
    ['ハ\u3099', 'バ'],
    ['ヒ\u3099', 'ビ'],
    ['フ\u3099', 'ブ'],
    ['ヘ\u3099', 'ベ'],
    ['ホ\u3099', 'ボ'],
];

const testCasesHandakuten = [
    ['は\u309A', 'ぱ'],
    ['ひ\u309A', 'ぴ'],
    ['ふ\u309A', 'ぷ'],
    ['へ\u309A', 'ぺ'],
    ['ほ\u309A', 'ぽ'],
    ['ハ\u309A', 'パ'],
    ['ヒ\u309A', 'ピ'],
    ['フ\u309A', 'プ'],
    ['ヘ\u309A', 'ペ'],
    ['ホ\u309A', 'ポ'],
];

const testCasesIgnored = [
    ['な\u3099', 'な\u3099'],
    ['な\u309A', 'な\u309A'],
    ['に\u3099', 'に\u3099'],
    ['に\u309A', 'に\u309A'],
    ['ぬ\u3099', 'ぬ\u3099'],
    ['ぬ\u309A', 'ぬ\u309A'],
    ['ね\u3099', 'ね\u3099'],
    ['ね\u309A', 'ね\u309A'],
    ['の\u3099', 'の\u3099'],
    ['の\u309A', 'の\u309A'],
    ['ま\u3099', 'ま\u3099'],
    ['ま\u309A', 'ま\u309A'],
    ['み\u3099', 'み\u3099'],
    ['み\u309A', 'み\u309A'],
    ['む\u3099', 'む\u3099'],
    ['む\u309A', 'む\u309A'],
    ['め\u3099', 'め\u3099'],
    ['め\u309A', 'め\u309A'],
    ['も\u3099', 'も\u3099'],
    ['も\u309A', 'も\u309A'],
    ['ゃ\u3099', 'ゃ\u3099'],
    ['ゃ\u309A', 'ゃ\u309A'],
    ['や\u3099', 'や\u3099'],
    ['や\u309A', 'や\u309A'],
    ['ゅ\u3099', 'ゅ\u3099'],
    ['ゅ\u309A', 'ゅ\u309A'],
    ['ゆ\u3099', 'ゆ\u3099'],
    ['ゆ\u309A', 'ゆ\u309A'],
    ['ょ\u3099', 'ょ\u3099'],
    ['ょ\u309A', 'ょ\u309A'],
    ['よ\u3099', 'よ\u3099'],
    ['よ\u309A', 'よ\u309A'],
    ['ら\u3099', 'ら\u3099'],
    ['ら\u309A', 'ら\u309A'],
    ['り\u3099', 'り\u3099'],
    ['り\u309A', 'り\u309A'],
    ['る\u3099', 'る\u3099'],
    ['る\u309A', 'る\u309A'],
    ['れ\u3099', 'れ\u3099'],
    ['れ\u309A', 'れ\u309A'],
    ['ろ\u3099', 'ろ\u3099'],
    ['ろ\u309A', 'ろ\u309A'],
    ['ゎ\u3099', 'ゎ\u3099'],
    ['ゎ\u309A', 'ゎ\u309A'],
    ['わ\u3099', 'わ\u3099'],
    ['わ\u309A', 'わ\u309A'],
    ['ゐ\u3099', 'ゐ\u3099'],
    ['ゐ\u309A', 'ゐ\u309A'],
    ['ゑ\u3099', 'ゑ\u3099'],
    ['ゑ\u309A', 'ゑ\u309A'],
    ['を\u3099', 'を\u3099'],
    ['を\u309A', 'を\u309A'],
    ['ん\u3099', 'ん\u3099'],
    ['ん\u309A', 'ん\u309A'],
    ['ナ\u3099', 'ナ\u3099'],
    ['ナ\u309A', 'ナ\u309A'],
    ['ニ\u3099', 'ニ\u3099'],
    ['ニ\u309A', 'ニ\u309A'],
    ['ヌ\u3099', 'ヌ\u3099'],
    ['ヌ\u309A', 'ヌ\u309A'],
    ['ネ\u3099', 'ネ\u3099'],
    ['ネ\u309A', 'ネ\u309A'],
    ['ノ\u3099', 'ノ\u3099'],
    ['ノ\u309A', 'ノ\u309A'],
    ['マ\u3099', 'マ\u3099'],
    ['マ\u309A', 'マ\u309A'],
    ['ミ\u3099', 'ミ\u3099'],
    ['ミ\u309A', 'ミ\u309A'],
    ['ム\u3099', 'ム\u3099'],
    ['ム\u309A', 'ム\u309A'],
    ['メ\u3099', 'メ\u3099'],
    ['メ\u309A', 'メ\u309A'],
    ['モ\u3099', 'モ\u3099'],
    ['モ\u309A', 'モ\u309A'],
    ['ャ\u3099', 'ャ\u3099'],
    ['ャ\u309A', 'ャ\u309A'],
    ['ヤ\u3099', 'ヤ\u3099'],
    ['ヤ\u309A', 'ヤ\u309A'],
    ['ュ\u3099', 'ュ\u3099'],
    ['ュ\u309A', 'ュ\u309A'],
    ['ユ\u3099', 'ユ\u3099'],
    ['ユ\u309A', 'ユ\u309A'],
    ['ョ\u3099', 'ョ\u3099'],
    ['ョ\u309A', 'ョ\u309A'],
    ['ヨ\u3099', 'ヨ\u3099'],
    ['ヨ\u309A', 'ヨ\u309A'],
    ['ラ\u3099', 'ラ\u3099'],
    ['ラ\u309A', 'ラ\u309A'],
    ['リ\u3099', 'リ\u3099'],
    ['リ\u309A', 'リ\u309A'],
    ['ル\u3099', 'ル\u3099'],
    ['ル\u309A', 'ル\u309A'],
    ['レ\u3099', 'レ\u3099'],
    ['レ\u309A', 'レ\u309A'],
    ['ロ\u3099', 'ロ\u3099'],
    ['ロ\u309A', 'ロ\u309A'],
    ['ヮ\u3099', 'ヮ\u3099'],
    ['ヮ\u309A', 'ヮ\u309A'],
    ['ワ\u3099', 'ワ\u3099'],
    ['ワ\u309A', 'ワ\u309A'],
    ['ヰ\u3099', 'ヰ\u3099'],
    ['ヰ\u309A', 'ヰ\u309A'],
    ['ヱ\u3099', 'ヱ\u3099'],
    ['ヱ\u309A', 'ヱ\u309A'],
    ['ヲ\u3099', 'ヲ\u3099'],
    ['ヲ\u309A', 'ヲ\u309A'],
    ['ン\u3099', 'ン\u3099'],
    ['ン\u309A', 'ン\u309A'],
];

const textCasesMisc = [
    ['', ''],
    ['\u3099ハ', '\u3099ハ'],
    ['\u309Aハ', '\u309Aハ'],
    ['さくらし\u3099また\u3099いこん', 'さくらじまだいこん'],
    ['いっほ\u309Aん', 'いっぽん'],
];

describe('combining dakuten/handakuten normalization', () => {
    const {process} = normalizeCombiningCharacters;
    const testCases = [...testCasesDakuten, ...testCasesHandakuten, ...testCasesIgnored, ...textCasesMisc];
    test.each(testCases)('%s normalizes to %s', (input, expected) => {
        expect(process(input, true)).toStrictEqual(expected);
    });
});