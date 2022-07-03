
import React from "react";
import ReactDOM from "react-dom";
import { Container } from "semantic-ui-react";
import reportWebVitals from './reportWebVitals';
import Example from "./example";

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

function MyForm() {
    console.log(inputs)
    return (
        <form>
            {inputs.map(function (object, i) {
                return (<label>{object}
                    <input type="text" />
                </label>);
            })}

        </form>
    )
}


ReactDOM.render(

    <Container style={{ margin: 20 }}>
        <MyForm />
        <Example />
    </Container>,
    document.getElementById("root")
);

reportWebVitals();