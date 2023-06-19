let curHeight = window.innerHeight; 
let curWidth = window.innerWidth;
let curScrollY = window.scrollY;
let section = document.querySelectorAll('.intro, section');
let skill = document.querySelector('.profile__skill')
let skillList = document.querySelectorAll('.skill__list');

/*profile 휠 이벤트*/
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

    let applyTransform = (ele) => {
        e.preventDefault();

        if (this.classList.contains('on')) {
            if (ele) {
            nextEle.classList.add('next');
            this.classList.remove('next');
            } else {
            prevEle.classList.add('prev');
            this.classList.remove('prev');
            }
        } else {
            if (ele) {
            nextEle.classList.remove('next');
            } else {
            prevEle.classList.remove('prev');
            }
        }

        let targetEle = ele ? nextEle : prevEle;
        skill.style.transform = `translate(0, -${targetEle.offsetTop}px)`;
    };

    if(e.deltaY > 0 && (index == 0 || index == 1)) {   //스크롤 아래로
        applyTransform(true);
    } else  if (e.deltaY < 0 && (index == 1 || index == 2)) { //스크롤 위로
        applyTransform(false);
    }

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

/*project 영역 header 처리*/
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

/* profile 영역 내 애니메이션*/
function onOffAni() {
    curScrollY = window.scrollY;
    curWidth = window.innerWidth;

    let sec1_offTop = section[1].offsetTop;
    let sec2_offTop = section[2].offsetTop;
    let icoHello = document.querySelector('.ico_hello');
    let underline =document.querySelector('.text--bold');
    let profileText = document.querySelector('.profile__intro');
    let elements = [icoHello, underline, profileText];

    if(curWidth <= 768) {
        if(curScrollY >= sec1_offTop && curScrollY < sec2_offTop) {
            elements.forEach(ele => {
                ele.classList.add('on');
            })
        } 
    }
}

window.addEventListener('scroll', function(){
    updateHeader();
    onOffAni();
});

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

//let textBox = ["성공의 커다란 비결은 결코 지치지 않는 인간으로 인생을 살아가는 것이다.", "멈추지 않는 한 아무리 느리게 간다 해도 문제가 되지 않는다."]

navBtn.addEventListener('click', openClose);

window.addEventListener('load', function() {
    updateHeight();
    updateText();
    updateNav();
    headerFlexOnOFF();
})

window.addEventListener('resize', function() {
    updateHeight();
    updateText();
    updateNav();
    headerFlexOnOFF();
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
    var offsetT2 = section[2].offsetTop;
    var skillT = skill.offsetTop;
    let text= document.querySelector('.text');

    let skillTop = [];
    skillTop[0] = Math.ceil(skill.getBoundingClientRect().top);
    skillTop[1] = Math.ceil(skillList[0].offsetTop);
    skillTop[2] = Math.ceil(skillList[1].getBoundingClientRect().top);
    skillTop[3] = Math.ceil(skillList[2].getBoundingClientRect().top);

    text.innerHTML = `<span>${scroll} / ${offsetT} / ${offsetT2} <span>
                    <p sytle="font-size: 14px">${skillTop[0]} /${skillTop[1]} /${skillTop[2]} /${skillTop[3]} </p>
                    <p style="font-size: 14px">스크롤y /섹션1오프셋탑 /섹션2오프셋탑<br>
                    ul렉탑/list1오프셋탑 / list2렉탑 / list3렉탑
                    </p>`
}

//window.addEventListener('scroll', scroll);