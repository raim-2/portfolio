var xhr = new XMLHttpRequest();                
var cnt=0; // 0 1 2 3 4 5
var total=0; //객체배열의 총개수


function ok(i){
  var newContent = '';
  var page = '';
  let res = responseObject;
  let down = `<a href="./images/media.mp4">download</a>`;
   
  newContent = '<div class="project'+ responseObject.projects[i].id +' section2_inner inner">'
  newContent += '<h5 class="text_ir">'+ responseObject.projects[i].name +'</h5>';
  newContent += '<div class="project__result">';
  newContent += '<div class="result__video">';

  if (res.projects[i].id != 3) {
    newContent += '<img src="'+ res.projects[i].video +'" alt="'+ res.projects[i].title +' gif 이미지" class="img_video">';  
  } else {
    newContent += '<video src="'+ res.projects[i].video +'" autoplay loop muted class="video">';
    newContent += '<source src="'+ res.projects[i].video +'" type="video/mp4" />';
    newContent += `Sorry, your browser doesn't support embedded videos,
										but don't worry, you can ${down} it
										and watch it with your favorite video player!`;
    newContent += '</video>';
  }
  newContent += '</div>'
  newContent += '</div>'
  newContent += '<div class="project__info">';
  newContent += '<p class="info__tit">'+ res.projects[i].title +'</p>';
  newContent += '<p class="info__des">'+ res.projects[i].description +'</p>';
  newContent += '<ul class="info__detail">';
  newContent += '<li class="detail__item detail__period "><span class="detail__tit">제작기간</span><span class="detail__ans">'+ res.projects[i].period +'</span></li>';
  newContent += '<li class="detail__item detail__skill"><span class="detail__tit">제작스킬</span><span class="detail__ans">'+ res.projects[i].skill +'</span></li>';
  newContent += '<li class="detail__item detail__link"><span class="detail__tit">URL</span class="detail__ans"><a href="'+ res.projects[i].url +'" target="_blank" title="'+ res.projects[i].url_tit +'" class="btn_visit">'+res.projects[i].url+'</a></li>';
  newContent += '</ul>'; 

  if(res.projects[i].id == 1 || res.projects[i].id == 6) {
  newContent += '</div>';
  } else {
  newContent += '<div class="detail__qr">';
  newContent += '<img src="'+ res.projects[i].qr_img +'" alt="'+ res.projects[i].qr_alt +'">';
  newContent += '</div>'
  newContent += '</div>';
  }

  newContent += '</div>';

  page = res.projects[i].id + '<span class="slash">&#47;</span>' + total
  document.querySelector('.page_current').innerHTML = page;
  document.querySelector('.section2__project').innerHTML = newContent;
}

xhr.onload = function() {                     
 
  if(xhr.status === 200) {                    
    responseObject = JSON.parse(xhr.responseText);  
    // parse() 메소드를 호출하여 자바스크립트 객체배열로 변환한다.
    total=responseObject.projects.length;  //5
    ok(cnt); 
  }
};

document.querySelector('.btn_right').onclick=function(){
      cnt++;  // 0 1 2 3 4 0 1 2 3 4 
      if(cnt==total)cnt=0;
      ok(cnt);
}

document.querySelector('.btn_left').onclick=function(){
  cnt--; // 4 3 2 1 0 4 3 2 1 0
  if(cnt<0)cnt=total-1;
  ok(cnt);
}

xhr.open('GET', 'data/data.json', true);        // 요청을 준비한다.
xhr.send(null);                                 // 요청을 전송한다
