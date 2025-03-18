import React, { useRef, useState } from "react";
import ReactDom from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./SideDrawer.css";
export default function SideDrawer(props) {
  const nodeRef = useRef(null);

  const content = (
    <div>
      <CSSTransition
        nodeRef={nodeRef}
        in={props.show}
        timeout={200}
        classNames="slide-in-left"
        mountOnEnter
        unmountOnExit
      >
        <aside ref={nodeRef} onClick={props.onClick} className="side-drawer">
          {props.children}
        </aside>
      </CSSTransition>
    </div>
  );

  return ReactDom.createPortal(content, document.getElementById("drawer-hook"));
}
