// src/ChatbotUI.tsx
import React, { useState } from "react";
import "./App.css";
import {
  ModusSideNavigation,
  ModusTextInput,
} from "@trimble-oss/modus-react-components";
import "@trimbleinc/modus-react-bootstrap/css/dist/modus-react-bootstrap.min.css";

var expanded: boolean = false;
var showOverview:boolean = true;
const ChatbotUI = () => {

  function handleNavClick() {
    const sideNav = document.getElementById("sideNav");
    expanded = !expanded;
    sideNav?.setAttribute("expanded", expanded.toString());
  }

  
  function handleNewChatClick() {
    setChatBubbles([]);
    showOverview=true;
  }

  const [chatBubbles, setChatBubbles] = useState<{text: string; isUser: boolean}[]>([]);

  function giveResponse(
    event: React.KeyboardEvent<HTMLModusTextInputElement>,
    inputValue: string
  ) {
    if (event.key === "Enter") {

      // User input
      setChatBubbles((prevBubbles) => [...prevBubbles, { text: inputValue, isUser: true }]);

      // Mock response
      const mockResponse = `Mock response for ${inputValue}`;
      setChatBubbles((prevBubbles) => [...prevBubbles, { text: mockResponse, isUser: false }]);
      showOverview = false;

      const input = document.getElementById("input") as HTMLInputElement;
      input.value = "";
    }
  }
  const textIcon =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='currentColor' class='mi-solid mi-file-edit' width='24' height='24' viewBox='0 0 24 24'%3E<path d='M17.27 20h-12V4h7l2.02 2.02 1.5-1.5-2.23-2.23a.99.99 0 0 0-.71-.29H5.26c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-9.05l-2 2V20Zm-10.5-4.12V18c0 .28.22.5.5.5h2.12c.13 0 .26-.05.35-.15l8.44-8.44-2.83-2.83-8.44 8.45a.51.51 0 0 0-.15.35ZM20.59 6.8l-2.12-2.12c-.2-.2-.51-.2-.71 0l-1.35 1.35 2.83 2.83 1.35-1.35c.2-.2.2-.51 0-.71'/%3E%3C/svg%3E";

  function initialize() {
    const sidenav = document.querySelector("modus-side-navigation");
    if (sidenav) {
      sidenav.data = [
        {
          id: "home-menu",
          menuIcon: textIcon,
          label: "New Chat",
          onSideNavItemClicked: handleNewChatClick
        },
      ];
    }
  }

  initialize();
  return (
    <div className="App">
      <div id="dataTemplate">
        <div
          id="container"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100vh",
            width: "100vw",
            position: "relative",
            overflow:"scroll",
          }}
        >
          <ModusSideNavigation
            max-width="300px"
            id="sideNav"
            expanded={true}
            onClick={handleNavClick}
            collapseOnClickOutside={false}
            target-content="#dataTemplate #panelcontent"
            mode="push"
          ></ModusSideNavigation>

          <div
            id="panelcontent"
            style={{ padding: "10px", transition: "all 0.25s linear 0s" }}
          >
            {showOverview && (
            <div
              id="overview"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <h1>Welcome to Chatbot UI</h1>
              <p>Chatbot Ul is an open source clone of OpenAI's ChatGPT UI.</p>
              <h6>Important: Chatbot Ul is 100% unaffiliated with OpenAI.</h6>
              <br />
              <p style={{ fontSize: "13px" }}>
                Chatbot Ul allows you to plug in your API key to use this UI
                with their API.
                <br />
                It is only used to communicate with their API.
                <br />
                Please set your OpenAI API key in the bottom left of the
                sidebar.
                <br />
                If you don't have an OpenAl API key, you can get one here : 
                <a href='https://openai.com/' target='_blank'> openai.com</a>
              </p>
            </div>
            )}
             <div>
                {chatBubbles.map((message, index) => (
                  <div
                    key={index}
                    style={{ marginBottom: "10px", textAlign:"center", fontSize: "13px", color:message.isUser? "black": "white", display: "flex",
                    justifyContent: message.isUser ? "flex-end" : "flex-start",}}
                  >
                    <div
                      style={{
                        background: message.isUser? "#cbcdd6" : "#004f83",
                        padding: "10px",
                        borderRadius: "5px",
                        width: "fit-content",
                      }}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            <footer>
              <ModusTextInput
                placeholder="Message Chatbot"
                id="input"
                onKeyDown={(event) => {
                  const input = document.getElementById(
                    "input"
                  ) as HTMLModusTextInputElement;
                  const inputValue = input.value;
                  giveResponse(event, inputValue);
                }}
              >
                Send
              </ModusTextInput>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotUI;
