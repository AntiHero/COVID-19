import React, { useState } from "react";
import styles from "./InfoModal.module.scss";
import HelpIcon from "@material-ui/icons/Help";
import RedoIcon from "@material-ui/icons/Redo";
import { Modal, Button } from "react-materialize";


const InfoModal = () => {
  const [next, setNext] = useState(false);

  return (
    <div>
      <Modal
        actions={[
          <Button flat modal="close" node="button" waves="green">
            Close
          </Button>,
        ]}
        bottomSheet={false}
        fixedFooter={false}
        id="Modal-0"
        open={false}
        options={{
          dismissible: true,
          endingTop: "10%",
          inDuration: 250,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          opacity: 0.5,
          outDuration: 250,
          preventScrolling: true,
          startingTop: "4%",
        }}
        trigger={
          <HelpIcon
            className={styles.help}
            style={{ fontSize: 40, color: "5BE9C0" }}
          />
        }
      >
        <RedoIcon
          className={styles.next}
          onClick={() => setNext((prevState) => !prevState)}
          style={{ fontSize: 40, color: "5BE9C0" }}
        />
        <h2 className={styles.header}>Summary</h2>
        <hr />
        {!next ? (
          <>
            <p id="transition-modal-description">
              <b>COVID-19</b> affects different people in different ways.
              <br />
              <br />
              <em>
                Most infected people will develop mild to moderate illness and
                recover without hospitalization.
              </em>
            </p>
            <div>
              <u>Most common symptoms:</u>
              <ul className="collection">
                <li className="collection-item">fever</li>
                <li className="collection-item">dry cough</li>
                <li className="collection-item">tiredness</li>
              </ul>
            </div>
            <div>
              <u>Less common symptoms:</u>
              <ul className="collection">
                <li className="collection-item">aches and pains</li>
                <li className="collection-item">sore throat</li>
                <li className="collection-item">diarrhoea</li>
                <li className="collection-item">conjunctivitis</li>
                <li className="collection-item">headache</li>
                <li className="collection-item">loss of taste or smell</li>
                <li className="collection-item">
                  a rash on skin, or discolouration of fingers or toes
                </li>
              </ul>
            </div>
            <div>
              <u>Serious symptoms:</u>
              <ul className="collection">
                <li className="collection-item">
                  breathing or shortness of breath
                </li>
                <li className="collection-item">chest pain or pressure</li>
                <li className="collection-item">loss of speech or movement</li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <p id="transition-modal-description">
              <em>How can I protect myself?</em>
            </p>
            <div>
              <u>Wash your hands often:</u>
              <ul className="collection">
                <li className="collection-item">
                  Wash your hands often with soap and water for at least 20
                  seconds especially after you have been in a public place, or
                  after blowing your nose, coughing, or sneezing.
                </li>
                <li className="collection-item">
                  If soap and water are not readily available,{" "}
                  <b>use a hand sanitizer that contains at least 60% alcohol</b>
                  . Cover all surfaces of your hands and rub them together until
                  they feel dry.
                </li>
                <li className="collection-item">
                  <b>Avoid touching your eyes, nose, and mouth</b> with unwashed
                  hands.
                </li>
              </ul>
            </div>
            <div>
              <u>Avoid close contact:</u>
              <ul className="collection">
                <li className="collection-item">
                  <b>
                    Avoid close contact with people who are sick, even inside
                    your home.
                  </b>{" "}
                  If possible, maintain 6 feet between the person who is sick
                  and other household members.
                </li>
                <li className="collection-item">
                  <b>
                    Put distance between yourself and other people outside of
                    your home.
                  </b>
                  <ul className="collection">
                    <li className="collection-item">
                      Remember that some people without symptoms may be able to
                      spread virus.
                    </li>
                    <li className="collection-item">
                      Stay at least 2 meters (about 2 arms’ length) from other
                      people.
                    </li>
                    <li className="collection-item">
                      Do not gather in groups.
                    </li>
                    <li className="collection-item">
                      Stay out of crowded places and avoid mass gatherings.
                    </li>
                    <li className="collection-item">
                      Keeping distance from others is especially important for
                      people who are at higher risk of getting very sick.
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div>
              <u>Cover coughs and sneezes:</u>
              <ul className="collection">
                <li className="collection-item">
                  <b>
                    If you are in a private setting and do not have on your
                    cloth face covering, remember to always cover your mouth and
                    nose
                  </b>{" "}
                  with a tissue when you cough or sneeze or use the inside of
                  your elbow.
                </li>
                <li className="collection-item">
                  <b>Throw used tissues</b> in the trash.
                </li>
                <li className="collection-item">
                  Immediately <b>wash your hands</b> with soap and water for at
                  least 20 seconds. If soap and water are not readily available,
                  clean your hands with a hand sanitizer that contains at least
                  60% alcohol.
                </li>
              </ul>
            </div>
            <div>
              <u>Clean and disinfect:</u>
              <ul className="collection">
                <li className="collection-item">
                  <b>Clean AND disinfect frequently touched surfaces daily.</b>{" "}
                  This includes tables, doorknobs, light switches, countertops,
                  handles, desks, phones, keyboards, toilets, faucets, and
                  sinks.
                </li>
                <li className="collection-item">
                  <b>If surfaces are dirty, clean them.</b> Use detergent or
                  soap and water prior to disinfection.
                </li>
                <li className="collection-item">
                  <b>Then, use a household disinfectant.</b> Most common
                  EPA-registered household disinfectantsexternal icon will work.
                </li>
              </ul>
            </div>
            <div>
              <u>Monitor Your Health</u>
              <ul className="collection">
                <li className="collection-item">
                  <b>Be alert for symptoms.</b> Watch for fever, cough,
                  shortness of breath, or other symptoms of <b>COVID-19</b>.
                </li>
                <li className="collection-item">
                  <b>Take your temperature </b>if symptoms develop.
                </li>
                <li className="collection-item">
                  Follow{" "}
                  <a
                    href="https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/steps-when-sick.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CDC guidance
                  </a>{" "}
                  if symptoms develop.
                </li>
              </ul>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default InfoModal;
