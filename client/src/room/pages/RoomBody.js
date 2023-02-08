import React from "react";

import Arrow from "../assets/Arrow.svg";
import brush from "../assets/brush.svg";
import arrowdowno from "../assets/arrow-down-o.svg";
import cans from "../assets/cans.svg";
import "./RoomBody.css";

const RoomBody = () => {
  return (
    <div className="ROOM-BODY">
      <div className="ROOM-BODY-CANVAS">
        <div className="min-PhotoBoxGroup">
          <div className="min-PhotoBox">
            <div className="Photos"></div>
            <div className="OpenWork">
              <div className="OpenUploadFrame">
                <img src={Arrow} className="Icon-Arrow" />
              </div>
              <div className="min-invite">
                <div className="min-ButtonGroup">
                  <div className="min-Button">
                    <label className="worklabel">작업하기</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="SelectedPhoto"></div>
        <div className="EffectBox">
          <div className="Effects">
            <div className="effect">
              <img src={brush} className="brush" />
            </div>
            <div className="effect">
              <img src={brush} className="brush" />
            </div>
            <div className="effect">
              <img src={brush} className="brush" />
            </div>
          </div>
          <div className="Finished">
            <div className="min-ButtonGroup2">
              <div className="min-Button2">
                <img src={arrowdowno} className="img.arrow-down-o" />
                <label className="playlabel">재생 목록으로 이동</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ROOM-BODY-WebRTC">
        <div class="CAMs">
          <div class="CamFrame">
            <img src={cans} className="img.component-cans" />
            <div class="Name">
              <span class="NAME">Name</span>
            </div>
          </div>
          <div class="CamFrame">
            <img src={cans} className="img.component-cans" />
            <div class="Name">
              <span class="NAME">Name</span>
            </div>
          </div>
          <div class="CamFrame">
            <img src={cans} className="img.component-cans" />
            <div class="Name">
              <span class="NAME">Name</span>
            </div>
          </div>
          <div class="CamFrame">
            <img src={cans} className="img.component-cans" />
            <div class="Name">
              <span class="NAME">Name</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomBody;
