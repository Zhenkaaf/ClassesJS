class Modal {
  constructor(text = "error") {
    this.text = text;
    this.init();
    console.log(text);
  }

  init() {
    this.createMarkup();
    this.modal = document.getElementById("myModal");
    this.closeBtn = this.modal.querySelector(".close");
    this.attachEvents();
  }

  createMarkup() {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
<div id="myModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <p>${this.text}</p>
  </div>
</div>`
    );
  }

  attachEvents() {
    this.closeFn = this.closeFn.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.closeBtn.addEventListener("click", this.closeFn);
    window.addEventListener("click", this.handleClick);
  }

  handleClick(e) {
    if (e.target === this.modal) {
      this.closeFn();
    }
  }

  closeFn() {
    this.detachEvents();
    this.modal.remove();
    this.modal = null;
  }

  detachEvents() {
    this.closeBtn.removeEventListener("click", this.closeFn);
    window.removeEventListener("click", this.handleClick);
  }
}

class Player {
  static totalPlayers = 0;
  #privatScore;
  constructor(login, firstName, lastName, score = 100) {
    this.login = login;
    this.firstName = firstName;
    this.lastName = lastName;
    this._score = score;
    this.#privatScore = score;
    Player.totalPlayers++;
  }
  get fullName() {
    return this.firstName + " " + this.lastName;
  }
  set fullName(name) {
    const [f, l] = name.split(" ");
    this.firstName = f;
    this.lastName = l;
  }
  get score() {
    return this._score;
  }
  get pScore() {
    return this.#privatScore;
  }
  set score(num) {
    this.increaseScore(num);
  }
  increaseScore(num = 10) {
    this._score += num;
  }
  decreaseScore(num = 10) {
    this._score -= num;
  }
  static create(login) {
    return new Player(login, 250);
  }
  static sortByScore(a, b) {
    return a._score - b._score;
  }
}

class PaidPlayer extends Player {
  static totalPlayers = 0;
  constructor(login, score = 100, accBalance = 1000) {
    super(login, score);
    this.accBalance = accBalance;
    PaidPlayer.totalPlayers++;
  }
}

// опишите класс Collapser
class Collapser {
  constructor(cl) {
    /*  this.collElements = document.querySelectorAll(cl); */
    this.collapsers = document.getElementsByClassName(cl);
    this.init();
  }
  init() {
    /* this.collElements.forEach((element) => {
      element.addEventListener("click", this.collClickHandle);
    }); */
    for (let i = 0; i < this.collapsers.length; i++) {
      this.collapsers[i].addEventListener("click", this.collClickHandle);
    }
  }

  collClickHandle(e) {
    const button = e.target;
    const contentElement = button.nextElementSibling;
    const currentDisplay = contentElement.style.display;
    if (currentDisplay === "block") {
      contentElement.style.display = "none";
    } else {
      contentElement.style.display = "block";
    }
  }
}

/* new Collapser(".collapsible");
new Collapser(".collapsible2"); */
new Collapser("collapsible");
new Collapser("collapsible2");
