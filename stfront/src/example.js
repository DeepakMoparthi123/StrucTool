import React from "react";
import { Accordion, AccordionDetails, Icon } from "semantic-ui-react";

let jsonData = [
    {
        key: "Level1",
        title: "Level1",
        content: [
            {
                key: "Menu",
                title: "Menu",
                content: [
                    {
                        key: "Sharing",
                        title: "Sharing",
                        content: [
                            {
                                key: "Home",
                                title: "Home",
                                content: [],
                            },

                            {
                                key: "Profile",
                                title: "Profile",
                                content: [
                                    {
                                        key: "Account",
                                        title: "Account",
                                        content: [],
                                    },
                                    {
                                        key: "Followers",
                                        title: "Followers",
                                        content: [],
                                    },
                                ],
                            },
                            {
                                key: "Request",
                                title: "Request",
                                content: [
                                    {
                                        key: "Exhange",
                                        title: "Exchange",
                                        content: [],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                key: "Settings",
                title: "Settings",
                content: [
                    {
                        key: "Profile Setting",
                        title: "Profile Setting",
                        content: [],
                    },
                ],
            },
        ],
    },
    {
        key: "Level2",
        title: "Level2",
        content: [
            {
                key: "Level2A",
                title: "Level2A",
                content: [
                    {
                        key: "Level2A-Child",
                        title: "Level2A-Child",
                        content: [],
                    },
                ],
            },
        ],
    },
];

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
                            <Accordion.Content content={jsonData[i]["content"]} />
                            <Accordion.Accordion panels={jsonData[i]["content"]} />
                        </div>
                    ),
                };
            } else {
                jsonData[i]["content"] = {
                    content: (
                        <div>
                            <Accordion.Content content={jsonData[i]["content"]} />

                        </div>
                    ),
                };
            }
        }
    }
}


//Feed the transformed jsonData to panels prop and export
const AccordionExampleNested = (props) => (
    <Accordion defaultActiveIndex={0} panels={props.jsonExample} styled />
);

{/* < Accordion defaultActiveIndex={0} panels={
    jsonData
    //(() => { console.log(jsonData); accordify(jsonData); return jsonData })()
} styled /> */}


export default AccordionExampleNested;