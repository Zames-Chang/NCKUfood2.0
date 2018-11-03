//import axios from 'axios';
//import ImageCompressor from 'image-compressor.js';

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
      app.food_list = data
    })
  },
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
    food_name:' ',
    food_price: '',
    food_img: '',
    food_file: '',
    last_time: '',
    shop_code:'活力小廚',
    error_message: '你有東西未填',
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
            shop_code: add_food.shop_code,
            food_name: add_food.food_name,
            food_price: add_food.food_price,
            food_file: add_food.food_file,
            last_time: add_food.last_time // min
          }
          $.post("uploadFood",uploadFood, function (data) {
            if(data != -1){
              alert("上傳成功")
              app.food_list = data
              app.$forceUpdate()
            }
            else{
              alert("上傳失敗")
            }
          })
        }
        if (add_food.error_message[0] == '' && add_food.error_message[1] == '' && add_food.error_message[2] == '') {
          // display
        }
      });
    } } });



// make image to base64
function readFile() {
  if (this.fiddles && this.files[0]) {
    var FR = new FileReader();
    FR.addEventListener("load", function (e) {
      // e.target.result is image base64 form so binding it to Vue
      var str = e.target.result
      //var compressed = LZString.compress(str);
      add_food.food_img = e.target.result
      //add_food.food_file = str
      var my_lzma = new LZMA("./lzma_worker.js");
      console.log(add_food.food_img)
      //my_lzma.compress(str, 1, on_finish(result, error) {add_food.food_file = result}, on_progress(percent) {});
      $("#upload_food_img").css("background-image", 'url(' + add_food.food_img + ')');
      $("#upload_food_img").css("width", "300px");
      $("#upload_food_img").css("height", "200px");
      $("#upload_food_img").css("margin", "5px");
    });
    FR.readAsDataURL(this.files[0]);
  }
    /*
      const myfile = e.target.files[0]
      new ImageCompressor(myfile, {
    	quality: .6,
    	success(result) {
          const formData = new FormData();
          formData.append('file', result, result.name);
          add_food.food_file = formData
        },
        error(e) {
          console.log(e.message);
        },
      });
    */
}
document.getElementById("filechooser").addEventListener("change", readFile);

// renew data if some food out of time
function renew_data() {
  // ajax new data from backend
  $.post("getFood", function (data) {
    app.food_list = data
    app.$forceUpdate()
  })
}
window.setTimeout(renew_data, 60000);
