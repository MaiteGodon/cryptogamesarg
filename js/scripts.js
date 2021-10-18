/*NAV-SCROLL*/
var lastScrollTop; // This Varibale will store the top position

navbar = document.getElementById('navbarset'); // Get The NavBar

window.addEventListener('scroll', function () {
    //on every scroll this funtion will be called

    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    //This line will get the location on scroll

    if (scrollTop > lastScrollTop) { //if it will be greater than the previous
        navbar.style.top = '-20vh';
        //set the value to the negetive of height of navbar 
    }

    else {
        navbarset.style.top = '0';
        navbarset.style.transition = '0.5s';
    }

    lastScrollTop = scrollTop; //New Position Stored
});



/*TYPEWRITRER EFFECT*/
var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
}

