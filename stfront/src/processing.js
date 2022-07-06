

// top level function that takes in string of inputs, string of equations, and
// array of check_strings, where each check string is the name of one variable  
const top_level_extraction = (input_string, equation_string, check_strings) => {
    // maps each variable to its line
    const variable_map = process_equations(equation_string)
    const input_map = process_equations(input_string)


    console.log(variable_map)
    console.log(extract_variables(variable_map['V_uy'], variable_map, input_map))
    const output_hierarchy = {}

    /*
        Sample Output
        
    {
        check1: {
            variable1: {
                    result: "variable 1 = variable1a + variable1b",

                    variable1a: {
                        
                    },
                    variable1b: {

                    }
                },
            variable2: { }
        },
        check2: {
            variable1: { },
            variable2: { }
        },
        check3: { }

    }*/
    for (let check in check_strings) {
        console.log("check for " + check)
        var curr_object = {}
        output_hierarchy[check_strings[check]] = expand_variables(variable_map, input_map, check_strings[check], curr_object)
    }
    console.log(output_hierarchy)
    return;

}

const extract_variables = (line, variable_map, input_map) => {
    console.log(line)
    const array_of_variables = Array.from(line.split("=")[1].trim().matchAll(/\w*/g)) // get right side and match with regex
        .map(((value) => value[0])) // get first column
        .filter(variable => (variable.length > 0 && ((variable in variable_map) || (variable in input_map)))) // remove empty spaces


    return ([... new Set(array_of_variables)]) // remove duplicate variables
}

const process_equations = (equation_string) => {
    const variable_map = {}
    const split_lines = equation_string.split('\n').filter(line => !(line.replaceAll(' ', '').slice(0, 5) == "SEC//"))
    for (let line in split_lines) {
        let current_line = split_lines[line]
        let left_side_variable = current_line.trim().split("=")[0].trim()
        variable_map[left_side_variable] = current_line.trim()
    }

    return variable_map
}
const expand_variables = (variable_map, input_map, variable, output_hierarchy) => {
    console.log("expanding on " + variable)
    if (variable in input_map) {
        output_hierarchy["result"] = input_map[variable]
        return output_hierarchy
    }
    output_hierarchy["result"] = variable_map[variable]

    console.log(variable, variable_map, variable_map[variable])
    const incoming_variables = extract_variables(variable_map[variable], variable_map, input_map)


    for (let incoming_variable in incoming_variables) {
        output_hierarchy[incoming_variables[incoming_variable]] = {}
        expand_variables(variable_map, input_map, incoming_variables[incoming_variable], output_hierarchy[incoming_variables[incoming_variable]])
    }

    return output_hierarchy
}

export default top_level_extraction;