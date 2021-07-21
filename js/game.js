//  אובייקט של פרמטרים של המשחק :שם של שחקן בצד שמאל/ימין +הבחירה  שלו  ,האם ההרשמה של השחקנים למשחק הצליחה
//key code = הערך של הלחצן במקלדת שנלחץ
// המשתנה האחרון באובייקט הזה count click keybord - הוא כמות הפעמים שלחצו על המקלדת במהלך משחק בודד בחלק הראשון (מקסימום 1 כל צד )
//count_click_key_bord = 0  כמות הפעמים שלחצו על  המקלדת במהלך משחק אחד -כאשר שווה ל2 מחשב =מי ניצח
const game_state_parameters = { select_left_keycode: -1, select_right_keycode: -1, name_left: "", name_right: "", is_signup_succeeded: false, game_state_parameters: false, count_click_key_bord: 0 };

const arr_key_fight = [87, 83, 68, 74, 75, 76]; //     [87, "w"],  [83, "s"], [68, "d"], [74, "j"] [75, "k"], [76, "l"]

// כתובת תמונות אימוגי =אבן/נייר/מספרים
const stone_src = "../images//imagefight/stoneEmoji.png";
const paper_src = "../images//imagefight/paperEmoji.png";
const scissors_src = "../images/imagefight/ScissorsEmoji.png";

// מערך של כתובת התמונות 
const arr_src = [stone_src, paper_src, scissors_src];

// אלמנטים שמשתמש בהם במהךף המשחק
const elem_left = document.getElementById("left_img_emoji"); //left html elemt  - emoji 
const elem_right = document.getElementById("right_img_emoji"); //right html elemt  - emoji 
const elem_name_winner = document.getElementById("title_fight");;

// אובייקטים ואלמנטים מסויימים לחלק ב של המשחק
const elem_txt_count_down = document.getElementById("startGame_text");
const elem_span_count_down = document.getElementById("countDown");
const div_count_down = document.getElementById("div_count_down");
const countDown = { count: 5, text: "" };

const btn_mood_computer = document.getElementById("btn_computer");
const btn_mood_vs = document.getElementById("btn_vs_two");

const td1 = document.getElementById("td1");
// אינטרבל של השעון שסופר 5,,4,3,2,1 =מתחיל מערך countDown.count ההתחלתי למעלה
let interval_countdown;


//שלב א 


// משחק חוזר 
// ברגע שנלחץ נגיע להתחלת המשחק (בין אם זה בשלב א או ב )
function start_over_click() {

    game_state_parameters.select_left_keycode = -1;
    game_state_parameters.select_right_keycode = -1;
    game_state_parameters.name_left = "";
    game_state_parameters.name_right = "";
    game_state_parameters.is_signup_succeeded = false;
    game_state_parameters.count_click_key_bord = 0;

    clear_elment();


}

// פעולת עזר שמשתמשים ב restart
// הפעולה הזו מנקה את כל האלמנטים על המסך ,מאפסת משתנים וכו לצורך משחק חדש

function clear_elment() {
    elem_left.className = "display_none";
    elem_right.className = "display_none";
    elem_left.src = "";
    elem_right.src = "";
    elem_name_winner.className = "display_none"
    div_count_down.className = "display_none";
    btn_mood_computer.disabled = false;
    btn_mood_vs.disabled = false;
    document.body.childNodes[0].remove(); // canvas.className = "display_none";
    countDown.count = 5;
    elem_txt_count_down.innerHTML = "Start Fight";
    clearInterval(interval_countdown)
    td1.innerText = "j"

}
// לחיצה על כפתור מצב נגד המחשב כלומר צריך לבקש רק פרטים של שם אחד 
//נגד המחשב 
function computer_mood_click() {
    enter_detilasFighter(false);

    if (!game_state_parameters.is_signup_succeeded) {
        return alert("error pleade refresh the page ")
    } else {
        game_state_parameters.name_right = "computer"
        let rndInt = Math.floor(Math.random() * 3) + 3; //random nuber for the computer mood
        game_state_parameters.select_right_keycode = [rndInt - 2];
        game_state_parameters.count_click_key_bord = 1; //כאלו משהו לחץ
    }
}

// זוג -אחד נגד השני 
function vsTwo_mood_click() {
    // mood = true;
    enter_detilasFighter(true);
    game_state_parameters.count_click_key_bord = 0;

}

// םעולה המקלבת את מצב המשחק נגד המחשב או אחג נגד השני
// לפי מצב המשחק יודעת אם לבקש שם אחד או שנייים
// או ולידציה פשוטה אם הזינו שם 
function enter_detilasFighter(mood) {
    let text_signUp; // sign up -טקסט הודעה האם ההזנה של שמות המשתתפים למשחק הצליחה
    game_state_parameters.name_left = prompt("Please enter your name -fighter one:", "");
    game_state_parameters.name_right = "";
    // two fighter mood
    while ((game_state_parameters.name_left == null || game_state_parameters.name_left == "")) {
        game_state_parameters.name_left = prompt("Please enter your name -fighter one:", "");
    }

    if (mood) {
        while ((game_state_parameters.name_right == null || game_state_parameters.name_right == "")) {
            game_state_parameters.name_right = prompt("Please enter your name -fighter two:", "");
        }

    }
    btn_mood_computer.disabled = true;
    btn_mood_vs.disabled = true;
    text_signUp = "let start the game ";
    game_state_parameters.is_signup_succeeded = true;
    alert(text_signUp);


}


// שלב א של המשחק 
// key bord for the game
//LISTNER-בעת חיצה על המקלדת 

window.addEventListener("keydown", function(event) {
    // this.alert(game_state_parameters.count_click_key_bord)
    // משתנה עם ערך בוליאני , אמת=המקש שלחצו במקלדת הוא חלק מהמקשים המותרת
    let key_value
        // let fight = { side: , value: };
    if (game_state_parameters.is_signup_succeeded && (game_state_parameters.count_click_key_bord == 0 || game_state_parameters.count_click_key_bord == 1)) { //אם שניהם לא בחרו עדיין
        key_value = event.keyCode; //key value of key enter on key bord
        arr_key_fight.map((currElement, index) => {

            is_key_code_correct(key_value, currElement, index);

        });

        if (!game_state_parameters.check_key_bord_fight) {
            alert("you choose inccort key bord /one side choose more than on time")
        }
    }
    if (game_state_parameters.count_click_key_bord == 2) {
        fightClickCalck();
        game_state_parameters.count_click_key_bord++;
    }
});




function is_key_code_correct(key_value, currElement, index) {
    if (key_value == currElement) {
        if (index < 3 && game_state_parameters.select_left_keycode == -1) {
            game_state_parameters.select_left_keycode = index + 1; //INDEX 0,1,2=בגלל זה מוסיף אחד
            game_state_parameters.check_key_bord_fight = true;
            game_state_parameters.count_click_key_bord++;
        } else if (index < 3 && game_state_parameters.select_left_keycode != -1) {
            game_state_parameters.check_key_bord_fight = false;
        }
        if (index > 2 && game_state_parameters.select_right_keycode == -1) {
            game_state_parameters.select_right_keycode = index - 2; //index --3,4,5=-2=1,2,3
            game_state_parameters.check_key_bord_fight = true;
            game_state_parameters.count_click_key_bord++;
        } else if (index > 2 && game_state_parameters.select_right_keycode != -1) {
            game_state_parameters.check_key_bord_fight = false;
        }

    }



}


function fightClickCalck() {


    let i_left; //index of the code fight left in the arr_src
    let i_right; //index of the code fight right in the arr_src
    const res_game = game(game_state_parameters.name_left, game_state_parameters.select_left_keycode, game_state_parameters.name_right, game_state_parameters.select_right_keycode);
    let name_winner = res_game.winner.name;

    if (res_game.sideWin == "left") {
        i_left = res_game.winner.chooseCode - 1;
        i_right = res_game.loser.chooseCode - 1;


    } else { //teko  יכנס גם פה
        i_right = res_game.winner.chooseCode - 1;
        i_left = res_game.loser.chooseCode - 1;
    }


    console.log(name_winner)
    emoji_style_winner(arr_src[i_left], arr_src[i_right], name_winner)

    elem_span_count_down.style.visibility = "visible";
    elem_txt_count_down.style.visibility = "visible";
}






//function that get two img element and two src img
// the fun link the src to the element ,add a css class animation to the img 
function emoji_style_winner(src_left, src_right, namewinner) {

    elem_name_winner.classList.remove('display_none');
    elem_name_winner.className += " text_winner"; //חשוב לשים רווח בהתחלה כדי שיצליח להוסיף את ה class
    //text winner
    if (namewinner == "teko")
        elem_name_winner.innerHTML = `${namewinner} `;
    else
        elem_name_winner.innerHTML = `${namewinner} winner `;

    //src the photo
    elem_left.src = src_left;
    elem_right.src = src_right;

    //link the css class
    elem_left.classList.remove("display_none");
    elem_right.classList.remove("display_none");
    elem_left.className += " emoji_left";
    elem_right.className += " emoji_right";

    div_count_down.className = "count_down_block";
    elem_txt_count_down.style.visibility = "visible";



}

function start_game_canvas() {
    elem_left.className = "emoji_display_startCanvas";
    elem_right.className = "emoji_display_startCanvas";

    td1.innerText = "right";
    interval_countdown = setInterval(count_down_circle, 1000);

}

function count_down_circle() {

    if (countDown.count > 0) {
        elem_txt_count_down.innerText = countDown.count;
        elem_txt_count_down.style.visibility = "visible";
    } else if (countDown.count == 0) {
        countDown.text = "GO"
        elem_txt_count_down.innerHTML = countDown.text;
        game_second_part(30, 30, 30, 30, elem_left.src, elem_right.src, 1.2, 3, "title_fight");

    } else {
        clearInterval(interval_countdown)
        elem_txt_count_down.style.visibility = "collapse";
        elem_span_count_down.style.visibility = "collapse";
    }
    countDown.count--;

}