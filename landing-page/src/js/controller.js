import * as model from './model.js';

import emailService from './services/emailService.js';

import ctaFormView from './views/ctaFormView.js';
import copyrightView from './views/copyrightView.js';
import disclaimerView from './views/disclaimerView.js';
import modalView from './views/modalView.js';
import navigationView from './views/navigationView.js';
import overlayView from './views/overlayView.js';

import 'core-js/stable'; //polyfilling everything else
import 'regenerator-runtime/runtime'; //polyfilling async/await

const controlDisclaimer = async function () {
  try {
    disclaimerView.renderSpinner();
    await model.loadDisclaimer();
    disclaimerView.render(model.state.disclaimer);
  } catch (err) {
    console.error(err);
    disclaimerView.renderError();
  }
};

const controlEmailConfig = async function () {
  try {
    await model.loadEmailConfig();
  } catch (err) {
    console.error(err);
  }
};

const controlEmailSend = async function (data) {
  let modalData = {};

  try {
    overlayView.display();
    overlayView._setAlertPosition(data.viewPosition);
    overlayView.renderSpinner();
    const emailObject = { ...data, ...model.state.emailConfig };
    await emailService.run(emailObject);
    modalData = model.state.modals
      .filter(m => m.type === 'cta_form_submit_success')
      .at(0);
  } catch (err) {
    overlayView.refresh();
    console.error(err);
    modalData = model.state.modals
      .filter(m => m.type === 'cta_form_submit_fail')
      .at(0);
  } finally {
    modalView._setAlertPosition(data.viewPosition);
    modalView.render(modalData);
    modalView.display();
  }
};

const controlModals = async function () {
  try {
    await model.loadModals();
  } catch (err) {
    console.error(err);
  }
};

const controlModalHide = function (hide = true) {
  hide && modalView.hide();
};

const init = function () {
  emailService.init(controlEmailConfig);

  navigationView.init();
  ctaFormView.addHandlerSubmit(controlEmailSend);
  copyrightView.init();
  disclaimerView.init();
  disclaimerView.addHandlerRender(controlDisclaimer);
  overlayView.addHandlerClick(controlModalHide);
  modalView.init();
  modalView.addHandlerLoadData(controlModals);
};

init();
