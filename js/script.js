/**
 * Created by mikelseverson on 7/1/15.
 */
$(document).ready(function() {
    $(".show-resume").on('click', function(event) {
        event.preventDefault();
        $('.card').slideDown();
    });
});
