import NotGood from "../Assets/Images/It's just fine'.png";
import LoveIt from "../Assets/Images/Loveit.png";
import Neutral from "../Assets/Images/Neutral.png";
import Worst from "../Assets/Images/Worst.png";
import Good from "../Assets/Images/Good.png";

const feedbackImages = {
  worst: { img: Worst, label: "Worst" },
  notGood: { img: NotGood, label: "Not Good" },
  fine: { img: Neutral, label: "Fine" },
  lookGood: { img: Good, label: "Look Good" },
  veryGood: { img: LoveIt, label: "Very Good" },
};

export { feedbackImages };
