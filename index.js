"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// get form from element html for reference and preform manipulation
// export interface Weather {
//   word: string;
//   phonetic: string;
//   phonetics?: (PhoneticsEntity)[] | null;
//   origin: string;
//   meanings?: (MeaningsEntity)[] | null;
// }
// export interface PhoneticsEntity {
//   text: string;
//   audio?: string | null;
// }
// export interface MeaningsEntity {
//   partOfSpeech: string;
//   definitions?: (DefinitionsEntity)[] | null;
// }
// export interface DefinitionsEntity {
//   definition: string;
//   example: string;
//   synonyms?: (null)[] | null;
//   antonyms?: (null)[] | null;
// }
const form = document.querySelector('#defineform');
const list = document.querySelector('.list-unstyled');
const header = document.querySelector('h1');
form.onsubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const formData = new FormData(form); // forma data from form
    const text = formData.get('defineword'); // get the word user input
    try {
        const response = yield fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`);
        const data = yield response.json();
        header.innerText = text;
        list.innerHTML = '';
        data[0].meanings.forEach((meaning) => {
            const li = document.createElement('p');
            li.innerText = `${meaning.partOfSpeech} - ${meaning.definitions[0].definition}`;
            list.appendChild(li);
        });
        // data[1].meanings.forEach((meaning: any) => {
        //   const li = document.createElement('li');
        //   li.innerText = `${meaning.partOfSpeech} - ${meaning.definitions[0].definition}`;
        //   list.appendChild(li);
        // });
        data[0].meanings.forEach((meaning) => {
            const li = document.createElement('li');
            li.innerText = `example - ${meaning.definitions[0].example} - ${meaning.definitions[0].example}`;
            list.appendChild(li);
        });
    }
    catch (error) {
        console.log(error);
    }
    return false;
});
//# sourceMappingURL=index.js.map