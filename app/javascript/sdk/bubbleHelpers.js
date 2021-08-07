import { addClass, toggleClass, wootOn } from './DOMHelpers';
import { IFrameHelper } from './IFrameHelper';
import { BUBBLE_DESIGN } from './constants';

export const bubbleImg =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMjkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIzIDEyLjc1YzAgLjk0OC0uMzQ2IDEuNzY4LTEuMDQgMi40Ni0uNjkyLjY5NC0xLjUxMiAxLjA0LTIuNDYgMS4wNEg5LjExbC00LjQ4NSAzLjM5YS40ODIuNDgyIDAgMDEtLjU3NC4wNTUuNTI5LjUyOSAwIDAxLS4zMDEtLjQ5MlYxNi4yNWMtLjk0OCAwLTEuNzY4LS4zNDYtMi40Ni0xLjA0LS42OTQtLjY5Mi0xLjA0LTEuNTEyLTEuMDQtMi40NlY0YzAtLjk0OC4zNDYtMS43NjggMS4wNC0yLjQ2QzEuOTgxLjg0NSAyLjgwMS41IDMuNzUuNUgxOS41Yy45NDggMCAxLjc2OC4zNDYgMi40NiAxLjA0QzIyLjY1NSAyLjIzMSAyMyAzLjA1MSAyMyA0djguNzV6bTUuMjUtMy41Yy45NDggMCAxLjc2OC4zNDYgMi40NiAxLjA0LjY5NC42OTIgMS4wNCAxLjUxMiAxLjA0IDIuNDZ2OC43NWMwIC45NDgtLjM0NiAxLjc2OC0xLjA0IDIuNDYtLjY5Mi42OTQtMS41MTIgMS4wNC0yLjQ2IDEuMDRIMjYuNXYyLjk1M2MwIC4yMTktLjEuMzgzLS4zLjQ5MmEuNDgyLjQ4MiAwIDAxLS41NzUtLjA1NEwyMS4xNDEgMjVIMTQuMjVjLS45NDggMC0xLjc2OC0uMzQ2LTIuNDYtMS4wNC0uNjk0LS42OTItMS4wNC0xLjUxMi0xLjA0LTIuNDZWMThoOC43NWMxLjQ1OCAwIDIuNjk4LS41MSAzLjcxOS0xLjUzMSAxLjAyLTEuMDIxIDEuNTMxLTIuMjYgMS41MzEtMy43MTl2LTMuNWgzLjV6IiBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4='

export const body = document.getElementsByTagName('body')[0];
export const widgetHolder = document.createElement('div');

export const bubbleHolder = document.createElement('div');
export const chatBubble = document.createElement('div');
export const closeBubble = document.createElement('div');
export const notificationBubble = document.createElement('span');

export const getBubbleView = type =>
  BUBBLE_DESIGN.includes(type) ? type : BUBBLE_DESIGN[0];
export const isExpandedView = type => getBubbleView(type) === BUBBLE_DESIGN[1];

export const setBubbleText = bubbleText => {
  if (isExpandedView(window.$chatwoot.type)) {
    const textNode = document.getElementById('woot-widget--expanded__text');
    textNode.innerHTML = bubbleText;
  }
};

export const createBubbleIcon = ({ className, src, target }) => {
  let bubbleClassName = `${className} woot-elements--${window.$chatwoot.position}`;
  const bubbleIcon = document.createElement('img');
  bubbleIcon.src = src;
  bubbleIcon.alt = 'bubble-icon';
  target.appendChild(bubbleIcon);

  if (isExpandedView(window.$chatwoot.type)) {
    const textNode = document.createElement('div');
    textNode.id = 'woot-widget--expanded__text';
    textNode.innerHTML = '';
    target.appendChild(textNode);
    bubbleClassName += ' woot-widget--expanded';
  }

  target.className = bubbleClassName;
  return target;
};

export const createBubbleHolder = () => {
  addClass(bubbleHolder, 'woot--bubble-holder');
  body.appendChild(bubbleHolder);
};

export const createNotificationBubble = () => {
  addClass(notificationBubble, 'woot--notification');
  return notificationBubble;
};

export const onBubbleClick = (props = {}) => {
  const { toggleValue } = props;
  const { isOpen } = window.$chatwoot;
  if (isOpen !== toggleValue) {
    const newIsOpen = toggleValue === undefined ? !isOpen : toggleValue;
    window.$chatwoot.isOpen = newIsOpen;

    toggleClass(chatBubble, 'woot--hide');
    toggleClass(closeBubble, 'woot--hide');
    toggleClass(widgetHolder, 'woot--hide');
    IFrameHelper.events.onBubbleToggle(newIsOpen);
  }
};

export const onClickChatBubble = () => {
  wootOn(bubbleHolder, 'click', onBubbleClick);
};
