const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

const result = document.querySelector('.result')
const sound = document.querySelector('#sound')
const btn = document.querySelector('.buttonns')

btn.addEventListener('click', () => {

    let inputWord = document.querySelector('.inputs').value;

    fetch(`${url}${inputWord}`).then((response) => response.json()).then((data) => {
        console.log(data);

        const meanings = data[0].meanings;
        const phonetics = data[0].phonetics.find(phonetic => phonetic.audio) || {};
        const partOfSpeech = meanings[0].partOfSpeech || "N/A";
        const definition = meanings[0].definitions[0].definition || "No definition found";
        const example = meanings[0].definitions[0].example || "No example available";
        const audio = phonetics.audio || "";

        // Render the result without the 'onclick' in the HTML
        result.innerHTML = `
            <div class="word flex justify-between mt-[50px]">
                <h3 class="text-[30px] text-[#1f194c]">${inputWord}</h3>
                ${audio ? `<button id="playSoundBtn" class="bg-transparent text-[#ae9cff] border-none outline-none text-[18px]">
                    <i class="fa-solid fa-volume-high"></i>
                </button>` : ''}
            </div>

            <div class="details flex gap-[10px] text-[#b3b6d4] m-[5px_0px_20px_0px] text-[14px]">
                <p>${partOfSpeech}</p>
                <p>${phonetics.text || ''}</p>
            </div>

            <p class="word-meaning text-[#575a7b]">${definition}</p>

            <p class="word_example text-[#575a7b] italic border-l-[5px] border-[#ae9cff] pl-[20px] mt-[30px]">
                ${example}
            </p>`;

        if (audio) {
            sound.setAttribute("src", audio);

            
            document.querySelector('#playSoundBtn').addEventListener('click', playSound);
        } else {
            sound.setAttribute("src", "");
            console.log('Audio not available');
        }

    }).catch((error) => {
        result.innerHTML = `<h3 class="mt-[10px]"> Couldn't Find The Word </h3>`;
    });
});

function playSound() {
    sound.play();
}
