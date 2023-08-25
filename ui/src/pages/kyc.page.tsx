import GradientBG from "../components/GradientBG.js";

export default function Home() {
  return (
    <GradientBG>
      <object data="http://www.web-source.net" width="600" height="400">
        <embed src="http://www.web-source.net" width="600" height="400" />
        Error: Embedded data could not be displayed.
      </object>
    </GradientBG>
  );
}
