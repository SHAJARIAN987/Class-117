var date = new Date()
let display_date = "Date: " + date.toLocaleDateString()

$(document).ready(function(){
    $("#date").html(display_date)
    input_data = {}
    $("#button").click(function(){
        input_data = {
            "customer_review": $("#text").val()
        }
        console.log(input_data)
    })

    $.ajax({
        type: "POST",
        url:"/predictemotion",
        data: JSON.stringify(input_data),
        dataType: "json",
        contentType: 'application/json',
        success: function(result){
            predicted_emotion = result.predicted_emotion
            emo_url = result.predicted_emotion_img_url
    
            $("#sentiment").text(predicted_emotion)
            $("#sentiment").show()
    
            $("#emoji").attr("src", emo_url)
            $("#emoji").show()
        },
        error: function(result){
            alert(result.responseJSON.message)
        }
    })
})

