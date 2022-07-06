
import React from "react";
import ReactDOM from "react-dom";
import { Container } from "semantic-ui-react";
import reportWebVitals from './reportWebVitals';
import AccordionExampleNested from "./example";
import { Accordion, Icon } from "semantic-ui-react";
import text from '../src/calcs.txt';
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";

styleLink.href =
    "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);



var inputs = ['P_dl', 'P_ll', 'w_overburden', 'q_allow',
    'include_ftg_sw', 'X_ftg', 'Y_ftg', 'X_col', 'Y_col', 'f_c',
    'cover', 'h', 'x_bar_size', 'x_number_bars', 'x_f_y',
    'y_bar_size', 'y_number_bars', 'y_f_y', 'shear_f_yt', 'shear_bar_size',
    'spacing_x', 'spacing_y', 'include']

//list of lines
function readText(file_name, arrays) {
    console.log(text)
}
console.log(text)
readText('calcs.js', [])
function MyForm() {
    console.log(inputs)
    return (
        <form>
            {inputs.map(function (object, i) {
                return (
                    <label>{object}
                        <input type="text" />
                        <br></br><br></br>
                    </label>);

            })}

        </form>
    )
}



reportWebVitals();


var start_variable = `///////////////////FUNCTIONS////////////////////////
sizes = [3, 4, 5, 6, 7, 8, 9, 10, 11, 14, 18];
diameters = [.375, .5, .625, .75, .875, 1, 1.128, 1.27, 1.41, 1.693, 2.257]
areas = [.11, .2, .31, .44, .6, .79, 1, 1.27, 1.56, 2.25, 4]
function getDia(input) {
   let index = sizes.findIndex(sizes => sizes >= input);
   return diameters[index]
}
function getArea(input) {
   let index = sizes.findIndex(sizes => sizes >= input);
   return areas[index]
}


///////////////////INPUTS////////////////////////
//loading input
var P_dl = 1516;
P_ll = 1129;
w_overburden = 3;
//footing paramter input 
q_allow = 17;
include_ftg_sw = true;
//concrete 
X_ftg = 96;
Y_ftg = 96;
X_col = 20;
Y_col = 14;
f_c = 6;
cover = 3;
h = 36;
//flexure reinforcement x-dir
x_bar_size = 6;
x_number_bars = 23;
x_f_y = 60;
//flexure reinforcement y-dir
y_bar_size = 5;
y_number_bars = 23;
y_f_y = 60;
//shear reinforcement (optional)
shear_f_yt = 60;
shear_bar_size = 7;
spacing_x = 12;
spacing_y = 12;
//size effect factor
include = false;
lamda_s = 1;
`


var test_variable = `
 d = h - cover - Math.max(getDia(x_bar_size), getDia(y_bar_size)) - Math.min(getDia(x_bar_size), getDia(y_bar_size)) / 2;
SEC// forces
 P_sw = X_ftg / 12 * Y_ftg / 12 * h / 12 * 0.15;
 P_service_net = P_dl + P_ll;
 P_u_net = Math.max(1.2 * P_dl + 1.6 * P_ll, 1.4 * P_dl);
 q_u_net = P_u_net / (X_ftg / 12 * Y_ftg / 12);
 SEC// flexure
 beta = f_c < 4 ? 0.85 : f_c > 8 ? 0.65 : 1.05 - .05 * f_c;
 rho_min = .0018
 SEC// about y-axis
 A_st_provided_y = getArea(x_bar_size) * x_number_bars;
 a_y = A_st_provided_y * x_f_y / .85 / Y_ftg / f_c;
 c_y = a_y / beta;
 epsilon_t_y = (d - c_y) / c_y * .003;
 phi_b_y = epsilon_t_y < .002 ? .65 : epsilon_t_y > .005 ? .9 : .65 + (epsilon_t_y - .002) * 250 / 3;
 phiMn_y = phi_b_y * A_st_provided_y * x_f_y * (d - a_y / 2);
 M_u_y = q_u_net * (X_ftg / 12 / 2 - X_col / 12 / 2) ** 2 / 2 * Y_ftg;
 flexure_y_DCR = M_u_y / phiMn_y;
 SEC// about x-axis
 A_st_provided_x = getArea(y_bar_size) * y_number_bars;
 a_x = A_st_provided_x * y_f_y / .85 / X_ftg / f_c;
 c_x = a_x / beta;
 epsilon_t_x = (d - c_x) / c_x * .003;
 phi_b_x = epsilon_t_x < .002 ? .65 : epsilon_t_x > .005 ? .9 : .65 + (epsilon_t_x - .002) * 250 / 3;
 phiMn_x = phi_b_x * A_st_provided_x * y_f_y * (d - a_x / 2);
 M_u_x = q_u_net * (Y_ftg / 12 / 2 - Y_col / 12 / 2) ** 2 / 2 * X_ftg;
 flexure_x_DCR = M_u_x / phiMn_x;
 SEC// one way shear
 phi_v = .75;
 SEC// x-dir
 r_w_xdir = A_st_provided_y / Y_ftg / d;
 phi_V_cx = phi_v * Math.max(8 * lamda_s * (r_w_xdir ** (1 / 3)), 1) * Math.sqrt(Math.min(f_c, 10) * 1000) * d / 1000;
 phi_V_sx = shear_f_yt != "" && shear_bar_size != "" && spacing_x != "" && spacing_y != "" ? Math.min(8 *
    Math.sqrt(f_c * 1000) * d / 1000, phi_v * getArea(shear_bar_size) * Y_ftg / spacing_y * shear_f_yt * d / spacing_x / Y_ftg) : 0;
 phi_V_nx = phi_V_cx + phi_V_sx;
 V_ux = Math.max((X_ftg / 12 / 2 - X_col / 12 / 2 - d / 12) * q_u_net / 12, 0)
 one_way_shear_x_DCR = V_ux / phi_V_nx;
 SEC// y-dir
 r_w_ydir = A_st_provided_x / X_ftg / d;
 phi_V_cy = phi_v * Math.max(8 * lamda_s * (r_w_ydir ** (1 / 3)), 1) * Math.sqrt(Math.min(f_c, 10) * 1000) * d / 1000;
 phi_V_sy = shear_f_yt != "" && shear_bar_size != "" && spacing_x != "" && spacing_y != "" ? Math.min(8 * Math.sqrt(f_c * 1000) * d / 1000, phi_v * getArea(shear_bar_size) * X_ftg / spacing_x * shear_f_yt * d / spacing_x / X_ftg) : 0;
 phi_V_ny = phi_V_cy + phi_V_sy;
 V_uy = Math.max((Y_ftg / 12 / 2 - Y_col / 12 / 2 - d / 12) * q_u_net / 12, 0)
 one_way_shear_y_DCR = V_uy / phi_V_ny;
 one_way_shear_DCR = Math.max(one_way_shear_x_DCR, one_way_shear_y_DCR);
 SEC// bearing
 q_svc_gross = include_ftg_sw == true ? (P_service_net + P_sw) / (X_ftg / 12 * Y_ftg / 12) + w_overburden : (P_service_net) / (X_ftg / 12 * Y_ftg / 12) + w_overburden;
 bearing_DCR = q_allow != "" ? q_svc_gross / q_allow : "";
 SEC// two way shear
 b_o = (X_col + d + Y_col + d) * 2;
 beta_two_way = Math.max(X_col, Y_col) / Math.min(X_col, Y_col);
 phi_V_s = shear_f_yt != "" && shear_bar_size != "" && spacing_x != "" && spacing_y != "" ? phi_v * getArea(shear_bar_size) * shear_f_yt * b_o * (2 * X_ftg / (2 * X_ftg / 12 + 2 * Y_ftg / 12) / 12 / spacing_x + 2 * Y_ftg / (2 * X_ftg / 12 + 2 * Y_ftg / 12) / 12 / spacing_y) * d / (0.5 * (spacing_y + spacing_x)) : 0;
 two_way_factor = phi_V_s == 0 ? Math.min(2 + 4 / beta_two_way, 40 * d / b_o + 2, 4) : 2;
 phi_V_c = phi_v * two_way_factor * Math.sqrt(Math.min(f_c, 10) * 1000) * b_o * d / 1000 * lamda_s;
 phi_V_n = Math.min(phi_V_c + phi_V_s, 8 * Math.sqrt(f_c * 1000) / 1000 * b_o * d);
 V_u = Math.max(P_u_net - (X_col + d) * (Y_col + d) / 12 / 12 * q_u_net, 0);
 two_way_shear_DCR = V_u / phi_V_n;
`
eval.call(window, start_variable)
eval.call(window, test_variable.replaceAll('SEC', ''))

var arrangement = { "bearing": ["forces", "y-dir"] }
var input_array = test_variable.split('SEC')
var lines = []
var section_to_lines_map = {}
for (let section in input_array) {
    lines.push(input_array[section].split("\n"))
    section_to_lines_map[input_array[section].split("\n")[0]] = input_array[section].split("\n").slice(1)
}
console.log(section_to_lines_map)

var outside = []
var inside = []
for (const key in arrangement) {
    console.log("inside arrangement")
    outside.push(key + " DCR = " + eval.call(window, key + '_DCR'))
    inside.push([])
    for (const inside_key in arrangement[key]) {
        console.log(inside_key)
        console.log(section_to_lines_map["// " + arrangement[key][inside_key]])
        for (let inner_line in section_to_lines_map["// " + arrangement[key][inside_key]]) {
            inside[inside.length - 1].push(section_to_lines_map["// " + arrangement[key][inside_key]][inner_line])
            inside[inside.length - 1].push(section_to_lines_map["// " + arrangement[key][inside_key]][inner_line].split(" = ")[0] + " = " + eval.call(window, section_to_lines_map["// " + arrangement[key][inside_key]][inner_line].split(" = ")[0]))
        }
    }

}

console.log(outside)
console.log(inside)

var json_output = []
for (const key in arrangement) {
    let check_passed = eval.call(window, key + "_DCR <= 1")

    json_output.push({
        "key": key,
        "title": key + " check " + (check_passed ? "passed" : "failed") + " with a DCR of " + eval.call(window, key + "_DCR"),
        "text": section_to_lines_map["// " + key].join('\n'),
        "content": arrangement[key].map(elem => {
            return {
                "key": elem,
                "title": elem,
                "text": section_to_lines_map["// " + elem].join('\n'),
                "content": []
            }
        }
        )
    })
}

console.log(json_output)



console.log(json_output)
eval.call(window, 'console.log(two_way_shear_DCR)')


//Main algorithm
//<Accordion.Content content={jsonData[i]["content"]} />

//Main algorithm
function accordify(jsonData) {
    if (jsonData.length === 0) {
        return;
    } else {
        for (let i = 0; i < jsonData.length; i++) {
            accordify(jsonData[i]["content"]);

            if (jsonData[i]["content"].length !== 0) {
                jsonData[i]["content"] = {
                    content: (
                        <div>
                            <Accordion.Content content={jsonData[i]["text"]} />

                            <Accordion.Accordion panels={jsonData[i]["content"]} />
                        </div>
                    ),
                };
            } else {
                jsonData[i]["content"] = {
                    content: (
                        <div>
                            <Accordion.Content content={jsonData[i]["text"]} />

                        </div>
                    ),
                };
            }
        }
    }
}


accordify(json_output)
console.log(json_output)

ReactDOM.render(
    <Container>
        <MyForm />
        <AccordionExampleNested jsonExample={json_output} />
    </Container>,
    document.getElementById("root")
);
