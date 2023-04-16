
declare module "*.module.css";
declare module "*.module.scss";
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

const form : HTMLFormElement = document.querySelector('#defineform')!;
const list: HTMLUListElement = document.querySelector('.list-unstyled')!;
const header: HTMLHeadingElement = document.querySelector('h1')!;

form.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(form); // forma data from form
  const text = formData.get('defineword') as string; // get the word user input

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`);
    const data = await response.json();

    header.innerText = text;

    list.innerHTML = '';
    data[0].meanings.forEach((meaning: any) => {
      const li = document.createElement('p');
      li.innerText = `${meaning.partOfSpeech} - ${meaning.definitions[0].definition}`;
      list.appendChild(li);
    });

    // data[1].meanings.forEach((meaning: any) => {
    //   const li = document.createElement('li');
    //   li.innerText = `${meaning.partOfSpeech} - ${meaning.definitions[0].definition}`;
    //   list.appendChild(li);
    // });

    data[0].meanings.forEach((meaning: any) => {
      const li = document.createElement('li');
      li.innerText = `example - ${meaning.definitions[0].example} - ${meaning.definitions[0].example}`;
      list.appendChild(li);
    });
    
  } catch (error) {
    console.log(error);
  }
  return false;
};

