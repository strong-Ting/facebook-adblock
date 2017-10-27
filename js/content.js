function when_change(){
    $('div._4ikz:contains(贊助)').hide();
}
$(document).bind('DOMSubtreeModified', function () {
    when_change();
});
var test = document.getElementById('pagelet_ego_pane');
test.style.display = 'none';
