var sModal = "<div class='s-modal'><div class='s-modal-head'><span id='s-title'></span><a href='javascript:closeView();' class='s-modal-close'>" +
    "<i class='fa fa-close'></i></a></div> <div class='s-modal-con' id='s-content'></div><div class='footer text-center'><button type='button' class='n-btn2' onclick='closeView();'>确认</button></div></div>";

function closeView() {
    $(".s-modal").remove();
}
function viewArticle(title, type, pType, guiderType) {
    $.ajax({
        type: 'post',
        url: ctx + "/wap/open/common/article",
        data: {"type": type, "pType": pType, "guiderType":guiderType},
        dataType: 'json',
        success: function (data) {
            $("body").append(sModal);
            $("#s-title").html(title);
            $("#s-content").html(data.content);
            $(".s-modal").show();
        },
        error: function () {
            layer.msg('服务器响应超时');
        }
    });
}

function view_article(id, title) {
    var html = sModal.replace("$title$", title);
    $.ajax({
        type: 'get',
        url: ctx + "/wap/open/common/view-article/" + id,
        data: {},
        dataType: 'json',
        success: function (data) {
            $("body").append(sModal);
            $("#s-title").html(title);
            $("#s-content").html(data.content);
            $(".s-modal").show();
        },
        error: function () {
            layer.msg('服务器响应超时');
        }
    });
}

$(function () {
    var scrollTops = 0;
    $(".open-select").click(function () {
        $(this).next(".s-slider-box").addClass("active");
        $(".bg-fixed").show();
        scrollTops = $(window).scrollTop();
        $('body').css("top", -scrollTops + "px");
        $("#main").addClass("height-100");

//      $('.bg-fixed').css("top", scrollTops + "px");
    });
    $(".open-close").click(function () {
        $(this).parent().parent('.s-slider-box').removeClass("active");
        $(".bg-fixed").hide();
        $("#main").removeClass("height-100");
        $(window).scrollTop(scrollTops);
    });
    $(".bg-fixed").click(function () {
        $(this).hide();
        $(".sub-nav").removeClass("active");
        $(".s-slider-box").removeClass("active");
        $("#main").removeClass("height-100");
        $(window).scrollTop(scrollTops);
    });
});
