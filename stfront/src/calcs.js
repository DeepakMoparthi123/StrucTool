///////////////////INPUTS////////////////////////
//loading input
const P_dl = 0;
const P_ll = 0;
const w_overburden = 0;
//footing paramter input 
const q_allow = 0;
const include_ftg_sw = false;
//concrete 
const X_ftg = 0;
const Y_ftg = 0;
const X_col = 0;
const Y_col = 0;
const f_c = 0;
const cover = 0;
const h = 0;
//flexure reinforcement x-dir
const x_bar_size = 0;
const x_number_bars = 0;
const x_f_y = 0;
//flexure reinforcement y-dir
const y_bar_size = 0;
const y_number_bars = 0;
const y_f_y = 0;
//shear reinforcement (optional)
const shear_f_yt = 0;
const shear_bar_size = 0;
const spacing_x = 0;
const spacing_y = 0;
//size effect factor
const include = false;
const lamda_s = 0;
///////////////////calcs////////////////////////
//one way shear
const P_sw = X_ftg/12 * Y_ftg/12 * h/12 * 0.15;
const P_service_net = P_dl + P_ll;
const P_u_net = Math.max(1.2*P_dl + 1.6*P_ll, 1.4*P_dl);
const q_u_net = P_u_net / (X_ftg/12 * Y_ftg/12);
const phi_v = .75;
    //x-dir

    //y-dir

//bearing

//flexure about y-axis

//flexure about x-axis

//two way shear