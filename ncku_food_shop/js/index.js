 // fake data
var food_list = [{ food_name: "大雞雞1", food_img: ["https://i.imgur.com/oAAZLQ5.jpg", "https://i.imgur.com/oAAZLQ5.jpg"], last_time: 10, food_store: "晚間廚房", store_img: "https://i.imgur.com/oAAZLQ5.jpg" }, { food_name: "大雞雞2", food_img: ["https://i.imgur.com/oAAZLQ5.jpg"], last_time: 20, food_store: "晚間廚房", store_img: "https://i.imgur.com/oAAZLQ5.jpg" }, { food_name: "大雞雞3", food_img: ["https://i.imgur.com/oAAZLQ5.jpg", "https://i.imgur.com/oAAZLQ5.jpg", "https://i.imgur.com/oAAZLQ5.jpg"], last_time: 30, food_store: "晚間廚房", store_img: "https://i.imgur.com/oAAZLQ5.jpg" }, { food_name: "大雞雞4", food_img: ["https://i.imgur.com/oAAZLQ5.jpg"], last_time: 40, food_store: "晚間廚房", store_img: "https://i.imgur.com/oAAZLQ5.jpg" }];
// Vue for food list
var app = new Vue({
  el: "#food_list",
  data: {
    food_list: food_list,
    status: 0 },
  created: function() {
    $.post("getFood", function (data) {
      food_list = data
    })
  }
  methods: {
    next_one: function next_one() {
      var now_status = app.status;
      if (now_status == food_list.length - 1) {
        app.status = 0;
      } else
      {
        app.status = now_status + 1;
      }
    },
    last_one: function last_one() {
      var now_status = app.status;
      if (now_status == 0) {
        app.status = food_list.length - 1;
      } else
      {
        app.status = now_status - 1;
      }
    } } });


// Vue for reminder
var open_reminder = new Vue({
  el: "#functionial_button",
  data: {
    reminder_status: 0 },

  methods: {
    show_reminder: function show_reminder() {
      if (open_reminder.reminder_status == 0) {
        $("#reminder").css("opacity", 1);
        open_reminder.reminder_status = 1;
      } else
      {
        $("#reminder").css("opacity", 0);
        open_reminder.reminder_status = 0;
      }
    } } });


var my_reminder = new Vue({
  el: "#reminder",
  data: {
    checked: false },

  methods: {
    renew_reminder: function renew_reminder() {
      // ajax to backend here

    } } });


var add_food = new Vue({
  el: "#add_food",
  data: {
    shop_code:"活力小廚"
    food_name: '',
    food_price: '',
    food_img: '',
    last_time: '',
    error_message: "你有東西未填",
    error_code: false },

  methods: {
    submit_food: function submit_food() {
      $.post("ShopCode",{ userID:"123456" }, function (data) {
        alert("Data Loaded: " + data);
        if (add_food.food_name == '' || add_food.food_price == '' || add_food.food_img == '') {
          add_food.error_code = true;
        } else
        {
          add_food.error_code = false;
          var uploadFood = {
            shop_code: shop_code,
            food_name: food_name,
            food_price: food_price,
            food_img: food_img,// 我會將圖片轉用base64　以字串的方式傳輸過去　https://www.base64-image.de/
            last_time: last_time; // min
          }
          $.post("uploadFood",uploadFood, function (data) {
            app.food_list = data
            app.$forceUpdate()
          }
        }
        if (add_food.error_message[0] == '' && add_food.error_message[1] == '' && add_food.error_message[2] == '') {
          // display
        }
      });
    } } });



// make image to base64
function readFile() {

  if (this.files && this.files[0]) {

    var FR = new FileReader();

    FR.addEventListener("load", function (e) {
      // e.target.result is image base64 form so binding it to Vue
      add_food.food_img = e.target.result;
      $("#upload_food_img").css("background-image", 'url(' + add_food.food_img + ')');
      $("#upload_food_img").css("width", "300px");
      $("#upload_food_img").css("height", "200px");
      $("#upload_food_img").css("margin", "5px");
      //console.log(e.target.result)
    });
    FR.readAsDataURL(this.files[0]);
  }

}
document.getElementById("filechooser").addEventListener("change", readFile);

// renew data if some food out of time
function renew_data() {
  // ajax new data from backend

}
food_list.forEach(function (element) {
  window.setTimeout(renew_data, 1000);
});
