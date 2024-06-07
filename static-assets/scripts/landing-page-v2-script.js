import { getConfiguration } from "../config.js";
import { getUserTestimony } from "../data/user-testimonial.js";
import { getTestimonyDataMobile } from "../data/user-testimonial-mobile.js";
import { getWhoIsItFor } from "../data/who-is-it-for.js";
import { getLandingV2FAQs } from "../data/FAQs.js";
import {
  initCommonScript,
  initLoginIframe,
  initializeOptimize,
  initQueryEvents,
  injectVWOScript,
  injectThirtPartyScripts,
  toggleClassList
} from "../scripts/common-script.js";
import { Events } from "../../pages/home/events.js";

let industryTestimonialsMobile;
let whoIsItFor;
const trackingEventAttributeType = "main";
let industryTestimonials;
let supportingBusinessVideo = 0;

const supportingBusinessVideoData = [
  {
    name: "Mohammad Asgar (K.H. Enterprises)",
    industry: "Distributor - FMCG Industry",
    img: "mohammad-asgar-kh-enterprises.webp",
    alt: "Customer Testimonial from FMCG - myBillBook, Indiaâ€™s #1 Billing Software",
    embeddedViedeoLink: "https://www.youtube-nocookie.com/embed/KGLtlQ60WzY?si=q_P8EXkn-J_lmFDk&amp;controls=0",
    embeddedViedeoId: "KGLtlQ60WzY"
  },
  {
    name: "S.R. Ravi (S.R. Sports)",
    industry: "Retailer and Wholesaler - Sports Industry",
    img: "sr-ravi-sr-sports-legacy-sports-academy.webp",
    alt: "Customer Testimonial from Sports Business - myBillBook, Best Billing Software in India",
    embeddedViedeoLink: "https://www.youtube-nocookie.com/embed/AFUJXtVcMMw?si=TENC945t3Y6PQNtZ&amp;controls=0",
    embeddedViedeoId: "AFUJXtVcMMw"
  },
  {
    name: "Amar Singh (Lakshita Marketing)",
    industry: "Retailer - Hardware Industry",
    img: "amar-singh.webp",
    alt: "Customer Testimonial from Electrical Business - MBB, the best invoicing software",
    embeddedViedeoLink: "https://www.youtube-nocookie.com/embed/xpcdKfetgIU?si=nxCi_MR-AqsOpTMW&amp;controls=0",
    embeddedViedeoId: "xpcdKfetgIU"
  }
];

const extraFeaturesData = [
  {
    icon: "/static-assets/images/landing-page-v2/extra-feature-1.webp",
    text: "Billing App available in English, Hindi, Hinglish, Gujarati, Tamil",
    alt: "Billing App in English, Hindi, Hinglish, Gujarati, Tamil"
  },
  {
    icon: "/static-assets/images/landing-page-v2/extra-feature-2.webp",
    text: "Customer Support in your preferred language",
    alt: "Customer Support in preferred language"
  },
  {
    icon: "/static-assets/images/landing-page-v2/extra-feature-3.webp",
    text: "24x7 support through Call, WhatsApp, Chat or Email",
    alt: "24x7 support via Call, WhatsApp, Chat or Email"
  },
  {
    icon: "/static-assets/images/landing-page-v2/extra-feature-4.webp",
    text: "Secure cloud storage with end-to-end data encryption",
    alt: "Secure data storage"
  },
  {
    icon: "/static-assets/images/landing-page-v2/extra-feature-5.webp",
    text: "Transparent Policies & No Hidden Charges",
    alt: "Transparent Policies"
  },
  {
    icon: "/static-assets/images/landing-page-v2/extra-feature-6.webp",
    text: "Regular Software Updates & Feature Upgrades",
    alt: "Regular Software Updates"
  },
  {
    icon: "/static-assets/images/landing-page-v2/extra-feature-7.webp",
    text: "Be a part of MSME exclusive community",
    alt: "Build for MSME community"
  }
];

const bharatElement = [
  {
    fontWeigth: "600",
    text: "India"
  },
  {
    fontWeigth: "600",
    text: "à¤­à¤¾à¤°à¤¤"
  },
  {
    fontWeigth: "700",
    text: "à®‡à®¨à¯à®¤à®¿à®¯à®¾"
  },
  {
    fontWeigth: "600",
    text: "à²­à²¾à²°à²¤"
  },
  {
    fontWeigth: "700",
    text: "à´‡à´¨àµà´¤àµà´¯"
  },
  {
    fontWeigth: "600",
    text: "à°­à°¾à°°à°¤à°¦à±‡à°¶à°‚"
  }
]

window.trackingEventAttributeType = trackingEventAttributeType;
window.bodyload = bodyload;
window.moreContent = moreContent;
window.bookDemo = bookDemo;
window.changeSupportingBusninessVideo = changeSupportingBusninessVideo;
window.featureClicked = featureClicked;
window.printClicked = printClicked;
window.gstTabClicked = gstTabClicked;
window.navLinkClicked = navLinkClicked;
window.videoPlayClick = videoPlayClick;
window.videoPauseClick = videoPauseClick;
window.enterKeyPress = enterKeyPress;
window.onClickHamburger = onClickHamburger;
window.onClickDropdown = onClickDropdown;
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
window.onClickVolumeControl = onClickVolumeControl;
window.unmuteVideoIfPossible = unmuteVideoIfPossible;
window.onClickLoanLink = onClickLoanLink;
window.navigateToCreateAccount = navigateToCreateAccount;

let configuration = getConfiguration();

Events.initialiseSdks();
injectVWOScript();

const sectionList = [
  "hero",
  "super-power",
  "print-types",
  "anytime-section",
  "features-section",
  "gst-section",
  "get-more-section",
  "supporting-businesses-section",
  "extra-features",
  "bharat-element-section",
  "start-using-section",
  "faq-section",
  "publications-section"
];

let allSections = [];
let sectionPositions = []
let featureSectionExpanded = false;
let activeFeatureId = "feature-biling";
let activePrintId = "a4-print";
let activeGSTTab = "gstr-filing";
let mainBody;
let scrollDistance = 0;
let currentSectionCount = 0;
let ignoreObserver = false;
let player;
const NEW_LP_VERSION_PARAM = "lp"
const NEW_LP_VERSION_VALUE = "new"
const HERO_CONTAINER_COLUMN_ID = "heroContainerColumn1"
const HERO_CONTAINER_COLUMN_AB_ID = "heroContainerColumn1AB"
const HEADER_ACTIONS_ID = "headerActions"
const HEADER_ACTIONS_AB_ID = "headerActionsAB"
const PLAYSTORE_BUTTON_MOBILE = "playstore-link-ab-test-mobile"
const PLAYSTORE_BUTTON_DESKTOP = "playstore-link-ab-test-desktop"
const PLAYSTORE_AB_LINK = "https://mybillbook.sng.link/A1sl1/ugz8?_dl=dashboard&_smtype=3&utm_medium=cpm&utm_source=webhomepagevariation";
const MAIN_CTA_HERO_SECTION_ID = "main-cta-hero-section"
const GET_STARTED_CTA = "get-started-cta"
const GET_STARTED_GST_FEATURE_CTA = "get-started-gst-feature-cta"

// Will be called automatically by youtube iframe script
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    playerVars: {
      'playsinline': 1,
      "rel": 0,
      "controls": 0,
      'autoplay': 0,
      'fs': 0,
      'enablejsapi': 1,
      'disablekb': 1
    },
    events: {
      'onReady': function () {
        initSupportingBusinessVideo(supportingBusinessVideo);
      },
      'onStateChange': function (state) {
        if ([YT.PlayerState.PLAYING, YT.PlayerState.PAUSED].includes(state.data)) {
          Events.pushEvent('Testimonials', 'Testimonials', 'industries_fold', supportingBusinessVideoData[supportingBusinessVideo].industry);
        }
      }
    }
  });
}

const observer = new IntersectionObserver(intersectionDetected, {

  /*
   * Root should be div and not the default (doc).
   */
  root: mainBody,

  /*
   * Negative margin from the bottom creates an invisible line
   * to detect intersections.
   * 
   * The reason why the recommendation is to use -1% and -99% is to
   * avoid the race condition between two intersections happening
   * (AKA the section about to be out of the viewport and the section
   * about to enter the viewport).
   */
  rootMargin: '80px 0px 0px 0px',

  /*
   * Default value but making it explicit as this is the 
   * only configuration that works.
   */
  threshold: .5
});

initElements();
setScrollListnerV2();

/* AB TEST CODE STARTS*/
const pageSearchParams = new URLSearchParams(document.location.search);
const isNewVersion = pageSearchParams.get(NEW_LP_VERSION_PARAM) === NEW_LP_VERSION_VALUE;
if(isNewVersion) {
  // only for non-mobile header section
  const heroContainer = document.getElementById(HERO_CONTAINER_COLUMN_ID);
  const heroContainerAB = document.getElementById(HERO_CONTAINER_COLUMN_AB_ID);

  if (heroContainer) heroContainer.style.display = "none";
  if(heroContainerAB) heroContainerAB.style.display = "flex";

  // only if not mobile
  if(screen.width > 640) {
    const headerActions = document.getElementById(HEADER_ACTIONS_ID);
    const headerActionsAB = document.getElementById(HEADER_ACTIONS_AB_ID);

    if(headerActions) headerActions.style.display = "none";
    if(headerActionsAB) headerActionsAB.style.display = "flex";
  }

  // for playstore app download link
  const mobileLinkButton = document.getElementById(PLAYSTORE_BUTTON_MOBILE)
  const desktopLinkButton = document.getElementById(PLAYSTORE_BUTTON_DESKTOP)
  
  function addNewRedirectLink(anchorElement, link) {
    anchorElement.setAttribute('onclick', `ctaAppDownload('${link}')`)
  }

  addNewRedirectLink(mobileLinkButton, PLAYSTORE_AB_LINK)
  addNewRedirectLink(desktopLinkButton, PLAYSTORE_AB_LINK)

  // for cta links redirect to create-account-page
  const heroSectionCTA = document.getElementById(MAIN_CTA_HERO_SECTION_ID)
  const getStartedCTA = document.getElementById(GET_STARTED_CTA)
  const getStartedCTAGstFeature = document.getElementById(GET_STARTED_GST_FEATURE_CTA)

  function addCreateAccountPageNavigation(element) {
    element.setAttribute('onclick', 'navigateToCreateAccount()')
  }

  if(heroSectionCTA) addCreateAccountPageNavigation(heroSectionCTA)
  if(getStartedCTA) addCreateAccountPageNavigation(getStartedCTA)
  if(getStartedCTAGstFeature) addCreateAccountPageNavigation(getStartedCTAGstFeature)
}
/* AB TEST CODE ENDS*/

function bodyload() {
  const scriptsUrl = [];
  if (screen.width >= 640) {
    // Login iframe is only needed for desktop version
    initLoginIframe();

    // Youtube videos are only needed for desktop version
    scriptsUrl.push("https://www.youtube.com/iframe_api");
  }
  industryTestimonialsMobile = getTestimonyDataMobile();
  industryTestimonials = getUserTestimony();
  whoIsItFor = getWhoIsItFor();

  lazyLoadImages();

  injectThirtPartyScripts(scriptsUrl);
  initCommonScript("landing-page-v2");
  initializeOptimize();
  initQueryEvents(getLandingV2FAQs, true);

  let trackingEvent = {
    event_name: "landing_page_visited",
    attributes: {
      type: trackingEventAttributeType,
    },
  }
  Events.logAmplitudeEvent(trackingEvent)
  Events.logRudderstackEvent(trackingEvent)
  Events.logBlitzlamaEvent(trackingEvent)
  initSuperVideo();
  initPrintTypesLogoAnimation();
  initSupportingBusinessList();
  initExtrafeatures();
  initBharatElement();
}

function lazyLoadImages() {
  const lazyloadImages = document.querySelectorAll("img");
  lazyloadImages.forEach((image) => {
    // Only load desktop platform images if the screen size is larger than 640
    if (
      image.dataset.src &&
      (!image.dataset.platform ||
        (image.dataset.platform === "desktop" && screen.width >= 640))
    ) {
      image.src = image.dataset.src;
    }
  });
}

function initSuperVideo() {
  const superPowerVideo = document.getElementById("super-power-video");
  superPowerVideo.src = "/static-assets/videos/super-power.mp4";
}

function initElements() {
  mainBody = document.getElementById("accounting-container-v2");
  allSections = sectionList.map(function (section) {
    return document.getElementById(section);
  });
  sectionPositions = allSections.map(function (section) {
    return section.getBoundingClientRect().top;
  });
}

function setScrollListnerV2() {
  const superPower = document.getElementById("super-power-video-intersector");
  const featureSection = document.getElementById("features-section");
  observer.observe(superPower);
  observer.observe(featureSection);
}

function intersectionDetected(entries, observer) {
  entries.forEach((entry) => {
    if (!ignoreObserver) {
      switch (entry.target.id) {
        case "super-power-video-intersector":
          if (entry.isIntersecting) {
            videoPlayClick(false);
          } else {
            videoPauseClick(false);
          }
          break;
        case "features-section":
          if (entry.isIntersecting && !featureSectionExpanded) {
            expandFeatureSection();
          }
          break;
        default:
          break;
      }
    }
    return;
  });
};

function expandFeatureSection() {
  featureSectionExpanded = true;
  const countElement = document.getElementsByClassName("feature-message-count")[0];
  countElement.innerText = "0.1x";
  let value = .2;
  const interval = setInterval(function () {
    countElement.innerText = value + "x";
    value = +(value + .1).toFixed(1);
    if (value > 4.2) {
      clearInterval(interval);
      allSections[4].classList.add("features-section-expanded");
    }
  }, 10);
}

function navigateToHome() {
  document.getElementById("accounting-container").scrollTop = 0;
}

/* Logic for view more button on common queries fold and why flobooks fold */
function moreContent(elementID) {
  let parent = document.getElementById(elementID);
  let btnText = parent.getElementsByClassName("view-more-content")[0];
  if (btnText.innerHTML === "Less") {
    btnText.innerHTML = "All";
  } else {
    btnText.innerHTML = "Less";
  }
}

function changeSupportingBusninessVideo(change) {
  if ((change === 1 && supportingBusinessVideo < supportingBusinessVideoData.length - 1) || (change === -1 && supportingBusinessVideo > 0)) {
    supportingBusinessVideo += change;
    initSupportingBusinessVideo(supportingBusinessVideo);
  }
}

function initSupportingBusinessVideo(index) {
  const name = document.getElementById('supporting-businesses-videos-user-name');
  const industry = document.getElementById('supporting-businesses-videos-user-industry');
  const userImage = document.getElementById('supporting-businesses-videos-user-img');

  const actions = document.getElementsByClassName("supporting-businesses-videos-selection-action");
  actions[0].classList.remove("disabled");
  actions[1].classList.remove("disabled");

  if (supportingBusinessVideo === 0) {
    actions[0].classList.add("disabled");
  }

  if (supportingBusinessVideo === supportingBusinessVideoData.length - 1) {
    actions[1].classList.add("disabled");
  }

  player.cueVideoById(supportingBusinessVideoData[index].embeddedViedeoId, 0);
  name.innerHTML = userImage.alt = supportingBusinessVideoData[index].name;
  industry.innerHTML = supportingBusinessVideoData[index].industry;
  userImage.src = `/static-assets/images/landing-page-v2/${supportingBusinessVideoData[index].img}`;
  userImage.alt = supportingBusinessVideoData[index].alt
}


/**
 * Initializes the supporting business list and sets up an interval to cycle through businesses.
 */
function initSupportingBusinessList() {
  let activeBusiness = 1;
  const box = document.getElementsByClassName("supporting-businesses-list")[0];
  const businesses = document.getElementsByClassName("supporting-businesses-display");

  function setNextBusinessActive() {
    // Remove 'active' class from the current active business
    businesses[activeBusiness].classList.remove("active");

    // Make next business active
    activeBusiness += 1;
    businesses[activeBusiness].classList.add("active");
    box.scrollTo({
      top: (activeBusiness - 2) * 112,
      behavior: 'smooth'
    });
  }

  setInterval(function () {
    if (activeBusiness + 1 < businesses.length - 3) {
      // Make next business active till last 3rd business
      setNextBusinessActive();
    } else {
      // To make the illusion of an infinite scroll through businesses
      // Scroll instantly without any animation
      businesses[activeBusiness].classList.remove("active");
      activeBusiness = 6;
      businesses[activeBusiness].classList.add("active");
      box.scrollTo({
        top: (activeBusiness - 2) * 112
      });

      // Make next business active
      setNextBusinessActive();
    }
  }, 1500);
}



function initExtrafeatures() {
  let box = document.getElementsByClassName("extra-features-box");
  let count = 0;
  for (let i = 0; i < extraFeaturesData.length; i++) {
    const card = document.createElement('div');
    card.className = "extra-features-card";

    const icon = document.createElement('img');
    icon.src = extraFeaturesData[i].icon;
    icon.height = icon.width = 50;
    icon.alt = extraFeaturesData[i].alt;

    const text = document.createElement('div');
    text.innerText = extraFeaturesData[i].text;
    text.className = "extra-features-card-text";

    card.appendChild(icon);
    card.appendChild(text);

    if (i === 3) {
      const newRow = document.createElement('div');
      newRow.className = "extra-features-box";
      box[count].appendChild(newRow);
      box = document.getElementsByClassName("extra-features-box");
      count = count + 1;
    }
    box[count].appendChild(card);
  }
}

function initBharatElement(count = 0) {
  const element = document.getElementById("bharat-element");
  const maxCount = bharatElement.length;
  let animation = null;
  let opacity = 1;
  element.style.opacity = opacity;
  fadeOutElement();
  animation = setInterval(fadeOutElement, 40);
  function fadeOutElement() {
    if (opacity <= 0) {
      clearInterval(animation);
      element.innerText = bharatElement[count].text;
      element.style.fontWeight = bharatElement[count].fontWeigth;
      initBharatElement((count + 1) % maxCount);
    } else {
      opacity = opacity - .02;
      element.style.opacity = opacity;
    }
  }
}

function featureClicked(featureId) {
  if (activeFeatureId === featureId) {
    return;
  }
  Events.pushEvent("main_tab", featureId, "mbb_features");
  const feature = document.getElementById(featureId);
  const activeFeature = document.getElementById(activeFeatureId);
  const featureHeader = document.getElementById(featureId + "-header");
  const activeFeatureHeader = document.getElementById(activeFeatureId + "-header");
  activeFeature.classList.remove("active");
  feature.classList.add("active");
  activeFeatureHeader.classList.remove("active");
  featureHeader.classList.add("active");
  activeFeatureId = featureId;
}

function printClicked(printId) {
  if (activePrintId === printId) {
    return;
  }
  Events.pushEvent("main_tab", printId, "invoice_themes");
  const print = document.getElementById(printId);
  const activePrint = document.getElementById(activePrintId);
  const printHeader = document.getElementById(printId + "-header");
  const activePrintHeader = document.getElementById(activePrintId + "-header");
  activePrint.classList.remove("active");
  print.classList.add("active");
  activePrintHeader.classList.remove("active");
  printHeader.classList.add("active");
  activePrintId = printId;
}

function gstTabClicked(gstId) {
  if (activeGSTTab === gstId) {
    return;
  }
  const gst = document.getElementById(gstId);
  const activeGst = document.getElementById(activeGSTTab);
  const gstHeader = document.getElementById(gstId + "-header");
  const activeGstHeader = document.getElementById(activeGSTTab + "-header");
  activeGst.classList.remove("active");
  gst.classList.add("active");
  activeGstHeader.classList.remove("active");
  gstHeader.classList.add("active");
  activeGSTTab = gstId;
}

function onClickLoanLink() {
  Events.pushEvent('header', 'apply_now', 'loan_strip');
  setTimeout(() => {
    window.open("https://link.blitzllama.com/LBe4PXUw?lang=en", "_self");
  }, 200);

}

function navLinkClicked(index) {
  currentSectionCount = index;
  mainBody.scrollTo({
    top: allSections[currentSectionCount].getBoundingClientRect().top + mainBody.scrollTop - 90,
    behavior: "smooth"
  })
  onClickHamburger(false);
}

function onClickVolumeControl() {
  const video = document.getElementById("super-power-video");
  const volumeControl = document.getElementById("super-power-video-control-vol");
  video.muted = !video.muted;
  if (video.muted) {
    volumeControl.src = "/static-assets/icons/ic-volume-x.svg";
  } else {
    volumeControl.src = "/static-assets/icons/ic-volume-max.svg";
  }
}

function unmuteVideoIfPossible() {
  const video = document.getElementById("super-power-video");
  // Return is video is already unmuted
  if (!video.muted) return;

  // Check if user has done any interaction
  if (navigator.userActivation.hasBeenActive) {
    onClickVolumeControl();
  }
}


function videoPlayClick(sendEvent = true) {
  const video = document.getElementById("super-power-video");
  const videoBox = document.getElementsByClassName("super-power-video-container")[0];
  videoBox.classList.add("expanded-video");
  video.play();
  unmuteVideoIfPossible();
  sendEvent && Events.pushEvent("demo_video");
}

function videoPauseClick(sendEvent = true) {
  const video = document.getElementById("super-power-video");
  const videoBox = document.getElementsByClassName("super-power-video-container")[0];
  videoBox.classList.remove("expanded-video");
  video.pause();
  sendEvent && Events.pushEvent("demo_video");
}

function initPrintTypesLogoAnimation(count = 0) {
  const logo = document.getElementById("print-types-logo");
  let maxCount = 4;
  let logoText = [
    {
      text: "Logo",
      gradient: "linear-gradient(96deg, #B6649B 2.68%, #F9833C 96.19%)"
    },
    {
      text: "Font",
      gradient: "linear-gradient(96deg, #47A780 2.68%, #95DCA7 96.19%)"
    },
    {
      text: "Color",
      gradient: "linear-gradient(96deg, #CA5B99 2.68%, #970587 96.19%)"
    },
    {
      text: "And More!",
      gradient: "linear-gradient(96deg, #CEADFD 2.68%, #AC8ADB 96.19%)"
    }
  ]
  let opacity = 1;
  let animation;
  fadeOutElement();
  animation = setInterval(fadeOutElement, 40);
  function fadeOutElement() {
    if (opacity <= 0) {
      clearInterval(animation);
      count = (count + 1) % maxCount;
      logo.style.background = logoText[count].gradient;
      logo.style.backgroundClip = "text";
      logo.style.webkitBackgroundClip = "text";
      logo.style.webkitTextFillColor = "transparent";
      logo.innerText = logoText[count].text;
      initPrintTypesLogoAnimation(count);
    } else {
      opacity = opacity - .02;
      logo.style.opacity = opacity;
    }
  }
}

function enterKeyPress(event, id) {
  if (event.key === 'Enter') {
    showLogin(true, id);
    showLoginEvent('Login/Register', 'first_fold', trackingEventAttributeType)
  }
}

function onClickHamburger(sendEvent = true) {
  toggleClassList("hamburger-container", "d-flex-imp");
  toggleClassList("hamburger-background", "d-none-imp");
  sendEvent && Events.pushEvent("hamburger_menu");
}

function onClickDropdown(featureId) {
  toggleClassList(`${featureId}-menu`, "active-menu");
}

function navigateToCreateAccount() {
  window.location.href = "https://mybillbook.in/create-account"
}

function bookDemo() {
  window.location.href = "https://freetrial.mybillbook.in/talk-to-sales.html"
}