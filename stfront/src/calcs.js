
///////////////////FUNCTIONS////////////////////////
const sizes = [3, 4, 5, 6, 7, 8, 9, 10, 11, 14, 18];
const diameters = [.375, .5, .625, .75, .875, 1, 1.128, 1.27, 1.41, 1.693, 2.257]
const areas = [.11, .2, .31, .44, .6, .79, 1, 1.27, 1.56, 2.25, 4]
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
const P_dl = 1516;
const P_ll = 1129;
const w_overburden = 3;
//footing paramter input 
const q_allow = 17;
const include_ftg_sw = true;
//concrete 
const X_ftg = 96;
const Y_ftg = 96;
const X_col = 20;
const Y_col = 14;
const f_c = 6;
const cover = 3;
const h = 36;
//flexure reinforcement x-dir
const x_bar_size = 6;
const x_number_bars = 23;
const x_f_y = 60;
//flexure reinforcement y-dir
const y_bar_size = 5;
const y_number_bars = 23;
const y_f_y = 60;
//shear reinforcement (optional)
const shear_f_yt = 60;
const shear_bar_size = 7;
const spacing_x = 12;
const spacing_y = 12;
//size effect factor
const include = false;
const lamda_s = 1;

///////////////////calcs////////////////////////
const d = h - cover - Math.max(getDia(x_bar_size), getDia(y_bar_size)) - Math.min(getDia(x_bar_size), getDia(y_bar_size)) / 2;
//flexure about y-axis
const x_A_st_provided = getArea(x_bar_size) * x_number_bars;
//flexure about x-axis
const y_A_st_provided = getArea(y_bar_size) * y_number_bars;
//one way shear
const P_sw = X_ftg/12 * Y_ftg/12 * h/12 * 0.15;
const P_service_net = P_dl + P_ll;
const P_u_net = Math.max(1.2*P_dl + 1.6*P_ll, 1.4*P_dl);
const q_u_net = P_u_net / (X_ftg/12 * Y_ftg/12);
const phi_v = .75;
    //x-dir
const r_w_xdir = x_A_st_provided / Y_ftg / d;
const phi_V_cx = phi_v * Math.max(8 * lamda_s * (r_w_xdir ** (1/3)), 1) * Math.sqrt(Math.min(f_c, 10)*1000) * d/1000;
const phi_V_sx = shear_f_yt != "" && shear_bar_size != "" && spacing_x != "" && spacing_y != "" ? Math.min(8 * Math.sqrt(f_c*1000) * d/1000, phi_v * getArea(shear_bar_size) * Y_ftg / spacing_y * shear_f_yt * d/spacing_x / Y_ftg) : 0;
const phi_V_nx = phi_V_cx + phi_V_sx;
const V_ux = Math.max((X_ftg/12/2 - X_col/12/2 - d/12) * q_u_net/12, 0)
const one_way_shear_x_DCR = V_ux / phi_V_nx ;
    //y-dir
const r_w_ydir = y_A_st_provided / X_ftg / d;
const phi_V_cy = phi_v * Math.max(8 * lamda_s * (r_w_ydir ** (1/3)), 1) * Math.sqrt(Math.min(f_c, 10)*1000) * d/1000;
            //there might be an error in the excel code here bc of spacing_x and spacing_y for x and y directions
const phi_V_sy = shear_f_yt != "" && shear_bar_size != "" && spacing_x != "" && spacing_y != "" ? Math.min(8 * Math.sqrt(f_c*1000) * d/1000, phi_v * getArea(shear_bar_size) * X_ftg / spacing_x * shear_f_yt * d/spacing_x / X_ftg) : 0; 
const phi_V_ny = phi_V_cy + phi_V_sy;
const V_uy = Math.max((Y_ftg/12/2 - Y_col/12/2 - d/12) * q_u_net/12, 0)
const one_way_shear_y_DCR = V_uy / phi_V_ny ;
const one_way_shear_DCR = Math.max(one_way_shear_x_DCR, one_way_shear_y_DCR);
//bearing
const q_svc_gross = include_ftg_sw == true ? (P_service_net + P_sw) / (X_ftg/12 * Y_ftg/12) + w_overburden : (P_service_net) / (X_ftg/12 * Y_ftg/12) + w_overburden;
const bearing_DCR = q_allow != "" ? q_svc_gross / q_allow : "";


//two way shear

console.log(bearing_DCR);
console.log(one_way_shear_x_DCR);
console.log(one_way_shear_y_DCR);
console.log(one_way_shear_DCR)

