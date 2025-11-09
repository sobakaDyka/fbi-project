'use strict';
///////////////////// Elements ////////////////////
let isRedStateActive = false; // пізда тобі мразь йобана
const START_TIME = 300;
let time = START_TIME;
let timerIntervalID;

const loginScreen = document.querySelector('.login-screen');
const allFiles = document.querySelector('.all-files');
const caseSection = document.querySelector('.case-section');
const sectionRope = document.querySelector('.section-rope');
const sectionError = document.querySelector('.section-error');
const loadingEyesScreen = document.querySelector('.loading-eyes-screen');

const loginInputUser = document.querySelector('.login__input--user');
const loginInputPin = document.querySelector('.login__input--pin');

const btnLogIn = document.querySelector('.login__btn');

// Elements All Files ///
const allFilesTimer = document.querySelector('.all-files-timer');
const allFilesFelcomeMessage = document.querySelector(
  '.all-files-welcome-message'
);
const anketa = document.querySelector('.anketa');
const allFilesFolderPack = document.querySelector('.all-files-folder-pack');

///// turn red
const allFilesBtn = document.querySelector('.all-files-btn');
// const allFilesId = document.querySelectorAll('.all-files-id');
const allFilesHeader = document.querySelector('.all-files-header');

////////////////////

const startTimer = function () {
  clearInterval(timerIntervalID);
  time = START_TIME;

  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    allFilesTimer.textContent = `${min}:${sec}`;

    if (time < 0) {
      clearInterval(timerIntervalID);
      allFilesTimer.textContent = `CAUGHT YOU!`;
      autorizationScreen();
    }

    time--;
  };

  timerIntervalID = setInterval(tick, 1000); // Зберігаємо ID
};

////////////////////////////////

const autorizationScreen = function () {
  time = START_TIME;
  clearInterval(timerIntervalID);

  loginScreen.classList.remove('hidden');
  allFiles.classList.add('hidden');
  caseSection.classList.add('hidden');
  sectionRope.classList.add('hidden');
  sectionError.classList.add('hidden');
  loadingEyesScreen.classList.add('hidden');

  allFilesBtn.classList.remove('hidden');
  allFilesHeader.classList.remove('red-back');

  const detectiveName = document.querySelector('.detective-name');
  if (detectiveName) detectiveName.classList.remove('red-font');

  const allFilesId = document.querySelectorAll('.all-files-id');
  allFilesId.forEach(id => id.classList.remove('red-font'));

  allFilesCases.forEach(function (c) {
    c.imgDefault = c.originalImgDefault;
  }); /// отут треба знов дефолтні зображення, не переписані ХА просто 3 параметр конст в персонК

  allFilesTimer.classList.add('hidden');

  isRedStateActive = false;
};

const showAllFilesScreen = function () {
  allFiles.classList.remove('hidden');
  caseSection.classList.add('hidden');
};

// autorizationScreen();

// allFilesCases
//  Я ДУМАЮ ЦЕ ДЕСЬ В ЛОГІНІ І ПІСЛЯ РЕНДЕР ФАЙЛС
const renderFolders = function (allCases) {
  allFilesFolderPack.innerHTML = '';
  allCases.forEach(function (person, index) {
    const html = `<div class="all-files-folder-0" data-fileno="${person.fileNo}">
              <img
                class="all-files-folder-img img-${index}"
                alt="folder picture"
                src="img/folder.png"
              />
              <p class="all-files-id id-0">${person.fileNo}</p>
            </div>`;

    allFilesFolderPack.insertAdjacentHTML('afterbegin', html);
  });
};

/// RED STATE ВРОДЄЄ РАБОТАЄ

const redState = function () {
  const allFilesId = document.querySelectorAll('.all-files-id');

  allFilesId.forEach(id => id.classList.add('red-font'));

  const detectiveName = document.querySelector('.detective-name');
  if (detectiveName) detectiveName.classList.add('red-font');

  allFilesBtn.classList.add('hidden');
  allFilesHeader.classList.add('red-back');
  allFilesTimer.classList.remove('hidden');
  startTimer();

  // red stae
  isRedStateActive = true;

  //////////// CASE
  allFilesCases.forEach(function (c) {
    c.imgDefault = c.imgRed;
  });

  // const shinigamiEyesBlock = document.querySelector('.shinigami-eyes-block');
  // const redCase = document.querySelector('.red-case');
  // const redBtnAdd = document.querySelector('.red-btn-add');

  // shinigamiEyesBlock.classList.remove('hidden');
  // redCase.classList.remove('hidden');
  // redBtnAdd.classList.remove('hidden');
};

allFilesBtn.addEventListener('click', function () {
  redState();
});
///////////////////// Data ////////////////////
const account1 = {
  owner: 'Kim Jongin',
  pin: 1111,
};

const account2 = {
  owner: 'Wu Yifan',
  pin: 1111,
};

const account3 = {
  owner: 'Kim Junmyeon',
  pin: 1111,
};

const account4 = {
  owner: 'Byun Baekhyun',
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

///////////////////// Functions ////////////////////

// Making username

const makeUsernames = function (accnts) {
  accnts.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(w => w[0])
      .join('');
  });
};

makeUsernames(accounts);

////////// AUTHORIZATION ////////

// const autorizationScreen = function () {
//   loginScreen.classList.remove('hidden');
//   allFiles.classList.add('hidden');
//   caseSection.classList.add('hidden');
//   sectionRope.classList.add('hidden');
//   sectionError.classList.add('hidden');
//   loadingEyesScreen.classList.add('hidden');
// };

// let currentAccount;
// btnLogIn.addEventListener('click', function (e) {
//   e.preventDefault();

//   currentAccount = accounts.find(a => a.username === loginInputUser.value);
//   console.log(currentAccount);

//   if (currentAccount?.pin === +loginInputPin.value) {
//     loginScreen.classList.add('hidden');
//     allFiles.classList.remove('hidden');
//     console.log(typeof +loginInputPin.value);
//     console.log(currentAccount?.pin);
//   } else {
//     console.error('Шось не те з інпут данними');
//   }

//   const [firstName] = currentAccount.owner.split(' ');

//   allFilesFelcomeMessage.textContent = ` Welcome back, detective ${firstName}!`;

//   renderFolders(allFilesCases);
// });

////////// ALL FILES ////////

/// додати час логіну біля велком детектів

// зробити асинх підгрузку 5 папок на основі обджетків ін ріалтайм

////////// CASE FILES ////////

//Default case

class Person {
  #notes = '';

  constructor(
    fileName,
    fullName,
    dateOfBirth,
    citizenship,
    maritalStatus,
    listedAs,
    affiliation,
    fileNo,
    codename,
    hairColor,
    eyeColor,
    status,
    weight,
    bloodType,
    height,
    imgRed,
    imgDefault
  ) {
    this.fileName = fileName;
    this.fullName = fullName;
    this.dateOfBirth = dateOfBirth;
    this.citizenship = citizenship;
    this.maritalStatus = maritalStatus;
    this.listedAs = listedAs;
    this.affiliation = affiliation;
    this.fileNo = fileNo;
    this.codename = codename;
    this.hairColor = hairColor;
    this.eyeColor = eyeColor;
    this.status = status;
    this.weight = weight;
    this.bloodType = bloodType;
    this.height = height;
    this.imgRed = imgRed;
    this.imgDefault = imgDefault;
    this.originalImgDefault = imgDefault;
  }

  timeToLive() {
    const t = String(Math.round(Math.random() * 888888 + 100000));
    return t;
  }

  saveNote(noteText) {
    this.#notes = noteText;
    localStorage.setItem(`note_${this.fileNo}`, noteText);
  }

  // загрузка ГАВНА
  getNote() {
    const savedNote = localStorage.getItem(`note_${this.fileNo}`);
    if (savedNote) {
      this.#notes = savedNote;
      return savedNote;
    }
    return this.#notes;
  }
}

const misoraNaomi = new Person(
  'MISORA, NAOMI',
  'Naomi Misora',
  'February 11, 1976',
  'American (Japanese-American)',
  'Engaged (to Raye Penber)',
  'Special Agent (Former)',
  'FBI (On leave); L (Unofficially)',
  'N425JG-7A',
  'Shoko Maki',
  'Black',
  'Black',
  'On leave of absence',
  '46 kg',
  'A',
  '171 cm',
  `img/maki-red.jpg`,
  `img/maki.jpg`
);

const yagamiLight = new Person(
  'YAGAMI, LIGHT',
  'Light Yagami',
  'February 28, 1986',
  'Japanese',
  'Single',
  'Student (To-Oh University)',
  'Japanese Task Force',
  'JTF-001A',
  'Kira',
  'Brown',
  'Brown',
  'Active',
  '54 kg',
  'A',
  '179 cm',
  `img/y-red.jpg`,
  `img/y.jpg`
);

const allFilesCases = [misoraNaomi, yagamiLight];
console.log(misoraNaomi);
console.log(yagamiLight);

// ...

let currentAccount;
btnLogIn.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(a => a.username === loginInputUser.value);
  console.log(currentAccount);

  if (currentAccount?.pin === +loginInputPin.value) {
    loginScreen.classList.add('hidden');
    allFiles.classList.remove('hidden');
    console.log(typeof +loginInputPin.value);
    console.log(currentAccount?.pin);
  } else {
    console.error('Шось не те з інпут данними');
  }

  loginInputUser.value = ''; /// якшо шо зберігає дані логіну
  loginInputPin.value = ''; /////

  const [firstName] = currentAccount.owner.split(' ');
  const now = new Date();
  const day = `${now.getDate()}`.padStart(2, 0);
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const showCurTime = `${day}/${month}/${year}`;

  // allFilesFelcomeMessage.innerHTML = `Welcome back, detective <span class="detective-name">${firstName}</span> SESSION START: ${showCurTime}`;
  allFilesFelcomeMessage.innerHTML = `Welcome back, detective <span class="detective-name">${firstName}</span>`;

  allFiles.classList.remove('hidden');
  loginScreen.classList.add('hidden');
  allFilesTimer.classList.add('hidden');

  renderFolders(allFilesCases);
});

//////////////// тут вже папки відренждерені і я налаштовую кліки і підгрузку кейсів

const renderFoldersScreen = function (e) {
  const clickedFolder = e.target.closest('.all-files-folder-0');

  if (!clickedFolder) return;

  // 3. Отримуємо ID з data-атрибута, який ми додали в Кроці 1
  const clickedFileNo = clickedFolder.dataset.fileno;

  // 4. Знаходимо в масиві allFilesCases об'єкт з цим ID
  const personCase = allFilesCases.find(p => p.fileNo === clickedFileNo);

  if (personCase) {
    allFiles.classList.add('hidden');
    caseSection.classList.remove('hidden');

    anketa.innerHTML = '';

    upDateTheCaseFile(personCase);
  } else {
    console.error('Не можу знайти справу для ID:', clickedFileNo);
  }
};

allFilesFolderPack.addEventListener('click', renderFoldersScreen);

///////////////////////////////////////

// ...
const upDateTheCaseFile = function (personCase) {
  const html = `<p class="black-field-width"></p>
            <img class="top-secret-img" src="img/top-secret.png" />
            <p class="title-name-suspect" id="file-name">FILE: ${
              personCase.fileName
            }</p>
            <div class="start-section grid-2-case">
              <div class="property-column">
                <p class="property-name">Date of Birth:</p>
                <p class="property-name">Citizenship:</p>
                <p class="property-name">Marital Status:</p>
                <p class="property-name">Listed as:</p>
                <p class="property-name mg-btm">Affiliation:</p>

                <p class="property-name">File No.</p>
                <p class="property-name">Codename:</p>
              </div>

              <div class="value-column">
                <p class="value-name" id="file-dob">${
                  personCase.dateOfBirth
                }</p>
                <p class="value-name" id="file-citizenship">
                  ${personCase.citizenship}
                </p>
                <p class="value-name" id="file-status">
                  ${personCase.maritalStatus}
                </p>
                <p class="value-name" id="file-listed">
                  ${personCase.listedAs}
                </p>
                <p class="value-name mg-btm" id="file-affiliation">
                  ${personCase.affiliation}
                </p>

                <p class="value-name" id="file-fileNo">${personCase.fileNo}</p>

                <p class="value-name" id="file-codename">${
                  personCase.codename
                }</p>
              </div>
            </div>

            <!-- EYES -->
            <div class="shinigami-eyes-block">
              <span class="red-eyes-shinigami-timer">${
                personCase.fullName
              }</span>
              <span class="red-eyes-shinigami-timer">${personCase.timeToLive()}</span>
            </div>
            <!-- EYES -->

            <div class="img-V">
              <img id="file-image" alt="File photo" src="${
                personCase.imgDefault
              }" />
            </div>

            <p class="black-field-short">Physical Profile</p>

            <div class="start-section grid-4-case">
              <div class="property-column">
                <p class="property-name">Hair Color:</p>
                <p class="property-name">Eye Color:</p>
                <p class="property-name">Status:</p>
              </div>

              <div class="value-column">
                <p class="value-name" id="file-hair">${personCase.hairColor}</p>
                <p class="value-name" id="file-eyes">${personCase.eyeColor}</p>
                <p class="value-name" id="file-status"${personCase.status}</p>
              </div>

              <div class="property-column">
                <p class="property-name">Weight:</p>
                <p class="property-name">Blood Type:</p>
                <p class="property-name">Height:</p>
              </div>

              <div class="value-column">
                <p class="value-name" id="file-weight">${personCase.weight}</p>
                <p class="value-name" id="file-blood">${
                  personCase.bloodType
                }</p>
                <p class="value-name" id="file-height">${personCase.height}</p>
              </div>
            </div>

            <div class="red-case">
              <p class="red-field-short">NOTE</p>
              <form>
                <textarea
                  type="text"
                  placeholder="Write your sentence..."
                  maxlength="300"
                  class="red-note-filed hand-notes"
                ></textarea
                >/>
              </form>
            </div>

            <button class="red-btn-add hand-notes">ADD</button>

            <p class="value-name case-page-down-id" id="file-fileNo">
${personCase.fileNo}
            </p>
          </div>`;

  anketa.insertAdjacentHTML('afterbegin', html);

  /// ЧЕРВОНИЙ 'РЕЖИМ" ГАГАГА
  const shinigamiEyesBlock = document.querySelector('.shinigami-eyes-block');
  const redCase = document.querySelector('.red-case');
  const redBtnAdd = document.querySelector('.red-btn-add');
  const redNoteFiled = document.querySelector('.red-note-filed');

  if (!isRedStateActive) {
    shinigamiEyesBlock.classList.add('hidden');
    redCase.classList.add('hidden');
    redBtnAdd.classList.add('hidden');
  } else {
    redNoteFiled.value = personCase.getNote();

    redBtnAdd.addEventListener('click', function () {
      const currentSentence = redNoteFiled.value;
      personCase.saveNote(currentSentence);
      console.log(` ${personCase.fileNo}`);
    });
  }

  ///

  animateShinigamiEyes();

  const btnBackToLogin = document.querySelector('.back-to-login-btn');
  const btnBackToFiles = document.querySelector('.back-to-allfiles-btn');

  btnBackToLogin.addEventListener('click', autorizationScreen);
  btnBackToFiles.addEventListener('click', showAllFilesScreen);
};

const exitBtn = document.querySelector('.exit__btn');
exitBtn.addEventListener('click', autorizationScreen);

// upDateTheCaseFile(allFilesCases[0]);

// Add Sentence
// Red Note Sentence ПОТІМ В РЕД СТАНІ
/*
const redNoteFiled = document.querySelector('.red-note-filed');
const redBtnAdd = document.querySelector('.red-btn-add');

// лізу в базу?
const savedSentence = localStorage.getItem('savedNote');

if (savedSentence) {
  redNoteFiled.value = savedSentence;
}

// let currentSentence;
const writeSentence = function () {
  let currentSentence = redNoteFiled.value;

  // сейв?
  localStorage.setItem('savedNote', currentSentence);

  console.log(currentSentence);
};

redBtnAdd.addEventListener('click', writeSentence);
*/
/////////////////////////////////////////////////////
////// Анімація шінігамі

const animateShinigamiEyes = function () {
  const animatedTimers = document.querySelectorAll('.red-eyes-shinigami-timer');

  animatedTimers.forEach(timer => {
    const text = timer.textContent.trim();
    const letters = text.split('');

    timer.innerHTML = '';

    letters.forEach((letter, index) => {
      const span = document.createElement('span');
      span.classList.add('letter');

      if (letter === ' ') {
        span.innerHTML = '&nbsp;';
      } else {
        span.textContent = letter;
      }

      span.style.animationDelay = `${Math.random()}s`;
      span.style.animationDuration = `${1.5 + Math.random()}s`;

      timer.appendChild(span);
    });
  });
};
