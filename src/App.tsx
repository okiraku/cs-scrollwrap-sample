import * as React from "react";
import axios from "axios";
import { Center, chakra, Img } from "@chakra-ui/react";
import { Scroll, Keyframes } from "scrollex";
import ScrollWarp from "./ScrollWarp";

const ScrollContainer = chakra(Scroll.Container);
const ScrollSection = chakra(Scroll.Section);
const ScrollItem = chakra(Scroll.Item);
const CharkaScrollWarp = chakra(ScrollWarp);

const keyframes: Record<string, Keyframes> = {
  container: ({ section }) => ({
    [section.topAt("container-bottom") - 500]: {
      translateY: "40%",
      scale: 0.4
    },
    [(section.topAt("container-bottom") + section.bottomAt("container-top")) /
    2]: {
      scale: 1
    },
    [section.bottomAt("container-top") + 500]: {
      translateY: "-40%",
      scale: 0.4
    }
  })
};

const PhotoPage = ({ photo }) => {
  return (
    <ScrollSection h="100vh">
      <Center h="100%">
        <ScrollItem keyframes={keyframes.container}>
          <CharkaScrollWarp w="60vw" h="70vh">
            <Img
              h="100%"
              w="100%"
              objectFit="cover"
              src={`https://picsum.photos/id/${photo.id}/600/800`}
            />
          </CharkaScrollWarp>
        </ScrollItem>
      </Center>
    </ScrollSection>
  );
};

const App = () => {
  const [photos, setPhotos] = React.useState([]);

  React.useEffect(() => {
    axios.get("https://picsum.photos/v2/list?page=5&limit=20").then((res) => {
      setPhotos(res.data);
    });
  }, []);

  return (
    <ScrollContainer h="100vh">
      {photos.map((photo) => (
        <PhotoPage key={photo.id} photo={photo} />
      ))}
    </ScrollContainer>
  );
};

export default App;
