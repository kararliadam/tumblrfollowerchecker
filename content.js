$ = this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function() {
	get_blogs();
});
function get_blogs() {
	var blogs = new Array();
	$('.tab_blogs .tab_blog:not(.tab_dashboard)').each(function() {
		blogs.push($(this).attr('id').slice(9));
	});
	check_followings(blogs[0]);
}
function check_followings(me) {
	$('div#following div.follower').each(function(index, element) {
		var name = $('.info .name > a', this).html();
		if (name == null || name == "") return;
		$.ajax({
			type: "GET",
			url: "/svc/conversations/participant_info",
			data: {
				"participant": me + '.tumblr.com',
				"q": name + '.tumblr.com'
			},
			contentType: 'application/x-www-form-urlencoded',
			statusCode: {
				200: function(data, textStatus, jqXHR) {
					var div = $("<div />").addClass("ie_description");
					if (data.response.is_blog_following_you == true) {
						div.html('This user following you!');
						div.addClass("ie_follower");
					} else {
						div.html('This user not following you!');
						div.addClass("ie_non_follower");
					}
					$('.info', element).append(div);
				},
				403: function(jqXHR, textStatus, errorThrown) {
					data = $.parseJSON(jqXHR.responseText);
					var div = $("<div />").addClass("ie_not_sure").text("İkinci blogu seni takip etmiyor.");
					$('.info', element).append(div);
				}
			}
		});
	});
}
