let curHeight = window.innerHeight; 
let curWidth = window.innerWidth;
let curScrollY = window.scrollY;
let section = document.querySelectorAll('.intro, section');
let skill = document.querySelector('.profile__skill')
let skillList = document.querySelectorAll('.skill__list');

/*profile 휠 이벤트 - 너비 1024이상 */
let profileRight = document.querySelector('.profile-right');
let profileLeft = document.querySelector('.profile-left');
let skillArray = Array.from(skillList); //노드리스트 객체 - 배열 메소드 사용원하면 배열로 전환필요
let index = 0;

function scrollList(e) {
    let nextEle = this.nextElementSibling;
    let prevEle = this.previousElementSibling;
    let listClassBox = ['on', 'prev', 'next'];
    curWidth = window.innerWidth;

    if (skillArray.includes(e.target)) {
    index = skillArray.indexOf(e.target);
    }

    if(this) {
        for(ele of skillArray) {
            for(cla of listClassBox) {
                ele.classList.remove(''+ cla +'');
            }
        }
        this.classList.add('on');
    } 

  //if(curWidth >= 1024) {
    if(e.deltaY > 0 && (index == 0 || index == 1)) {   //스크롤 아래로
        e.preventDefault();
        let next = (this.nextElementSibling.offsetTop);

        if (this.classList.contains('on')) {
            nextEle.classList.add('next');
        } else {
            nextEle.classList.remove('next');
        }

        if(this.classList.contains('on') && this.classList.contains('next')) {
            this.classList.remove('next')
        }

        skill.style.transform = 'translate(0, -'+next+'px)';

    } else  if (e.deltaY < 0 && (index == 1 || index == 2)) { //스크롤 위로
        e.preventDefault();
        let prev = (this.previousElementSibling.offsetTop);

        if (this.classList.contains('on')) {
            prevEle.classList.add('prev');
        } else {
            prevEle.classList.remove('prev');
        }

        if(this.classList.contains('on') && this.classList.contains('prev')) {
            this.classList.remove('prev')
        }

        skill.style.transform = 'translate(0, -'+prev+'px)';
    }
  //}

    // if(e.deltaY < 0 && index == 0 && curWidth >= 1024) {
    //     let location = window.scrollY;
    //     location = 0;
    //     window.scrollTo(0, location);
    // }
}

for (let ele of skillList) {
    ele.addEventListener("wheel", scrollList, { passive: false, capture: true });
}


/*높이 처리*/
let introBottom = document.querySelector('.intro__bottom');
let introTop = document.querySelector('.intro__top');

function updateHeight() {
    let headerHeight = headerInner.clientHeight;
    let bottomHeight = introBottom.clientHeight;
    curHeight = window.innerHeight;

    introTop.style.height = (curHeight - headerHeight - bottomHeight)+ 'px'
    profileLeft.style.height = curHeight + 'px';
    skill.style.height = curHeight + 'px';
}

/*profile 영역 내 header 처리*/
let header = document.querySelector('.header');
function updateHeader() {
    curScrollY = window.scrollY;
    let sec2_offTop = section[2].offsetTop - 200;

    if(curScrollY >= sec2_offTop) {
        header.classList.add('header--fixed');
    } else {
        header.classList.remove('header--fixed');
    }
}
window.addEventListener('scroll', updateHeader);

/*header flexonoff 처리*/
let headerInner = document.querySelector('.header__inner')
let nav = document.querySelector('nav');
let navInner = nav.children;
let navBtn = document.querySelector('.header__nav-btn');

function headerFlexOnOFF () {
    curWidth = window.innerWidth;

    if(curWidth <= 768) {
        headerInner.classList.remove('clearfix');
        headerInner.classList.add('flex');
        nav.classList.remove('flex');
        navInner[1].classList.remove('flex');
    } else{
        headerInner.classList.add('clearfix');
        headerInner.classList.remove('flex');
        nav.classList.add('flex');
        navInner[1].classList.add('flex');
    }
}

/*nav 처리*/
let on_off = false;

function updateNav () {
    if (curWidth <= 768) {
        nav.style.right = -100 + '%';
        nav.style.display = 'none';
    } else {
        nav.style.right = 0;
        nav.style.display = 'flex';
    }
}

function openClose (){
    if (nav.style.right == (-100) + '%' && on_off == false) {
        navBtn.innerHTML = `<button class="btn btn_close" type="button">
                        <i class="fa-solid fa-x" aria-hidden="true"></i>
                        <span class="text_ir">닫힘 버튼</span>
                    </button> `;
        nav.style.display = 'block';
        nav.style.right = 0;
        on_off = true;
    } else {
        navBtn.innerHTML = `<button class="btn btn_open" type="button">
                        <i class="fa fa-bars" aria-hidden="true"></i>
                        <span class="text_ir">메뉴 버튼</span>
                    </button>`
        nav.style.display = 'none';
        nav.style.right = -100 + '%';
        on_off= false;
    }
}

/*intro text 처리*/
function updateText () {
    let motto = document.querySelector('.motto');
    curWidth = window.innerWidth;

    if(curWidth < 640) {
        motto.innerHTML = `<span style="bold">멈추지 않는 한</span><br>아무리 느리게 간다 해도<br>
                        문제가 되지 않는다.`;
    } else {
        motto.innerHTML = `<span style="bold">멈추지 않는 한</span> 아무리 느리게 간다 해도<br>
                        문제가 되지 않는다.`;
    }
}

navBtn.addEventListener('click', openClose);

window.addEventListener('load', function() {
    updateText();
    updateNav();
    updateHeight();
    headerFlexOnOFF();
})

window.addEventListener('resize', function() {
    updateText();
    updateNav();
    headerFlexOnOFF();
    updateHeight();
})

/*main으로 이동, click 이벤트*/
let introBtn = document.querySelector('.intro__btn');

function goDown() {
    let location = document.querySelector('.main').offsetTop; 
    window.scrollTo(0, location);
}

introBtn.addEventListener('click', goDown);

/* intro section에서 profile로 넘어가기 */
function goProfile(e) {
    let location = Math.ceil(section[1].getBoundingClientRect().top);
    curWidth = window.innerWidth;

    if(e.deltaY > 0 && curWidth >= 1024) {
        window.scrollTo(0, location);
    }
}

//section[0].addEventListener('wheel', goProfile, {passive: false});

/* scrollTop 체크 */
let imgBox = document.querySelector('.profile__img-wrap');

function scroll () {
    var scroll = Math.ceil(window.scrollY);
    var offsetT = section[1].offsetTop;
    var skillT = skill.offsetTop;
    let text= document.querySelector('.text');

    let skillTop = [];
    skillTop[0] = Math.ceil(skill.getBoundingClientRect().top);
    skillTop[1] = Math.ceil(skillList[0].offsetTop);
    skillTop[2] = Math.ceil(skillList[1].getBoundingClientRect().top);
    skillTop[3] = Math.ceil(skillList[2].getBoundingClientRect().top);

    text.innerHTML = `<span>${scroll} / ${offsetT} / ${skillT} <span>
                    <p sytle="font-size: 14px">${skillTop[0]} /${skillTop[1]} /${skillTop[2]} /${skillTop[3]} </p>
                    <p style="font-size: 14px">스크롤y /섹션1오프셋탑 /스킬오프셋탑<br>
                    ul렉탑/list1오프셋탑 / list2렉탑 / list3렉탑
                    </p>`
}

//window.addEventListener('scroll', scroll);