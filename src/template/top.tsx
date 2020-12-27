import { FC } from "react";
import styled from "styled-components";
import Heading from "~/components/heading";
import Story from "~/components/story";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 720px;
  padding: 0 20px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  margin-top: 30px;
`;

const Template: FC = () => (
  <Container>
    <Heading>新着のお話</Heading>
    <Story
      title={"紫天鵞絨"}
      body={`やはらかく深紫の天鵞絨ビロウドをなづる心地か春の暮れゆく
いそいそと燕もまへりあたゝかく郵便馬車をぬらす春雨
ほの赤く岐阜提灯もともりけり「二つ巴」の春の夕ぐれ（明治座三月狂言）
戯奴ジヨーカーの紅き上衣に埃の香かすかにしみて春はくれにけり
なやましく春は暮れゆく踊り子の金紗の裾に春は暮れゆく
春漏の水のひゞきかあるはまた舞姫のうつとほき鼓か（京都旅情）
片恋のわが世さみしくヒヤシンスうすむらさきににほひそめけり
恋すればうら若ければかばかりに薔薇さうびの香にもなみだするらむ
麦畑の萌黄天鵞絨芥子けしの花五月の空にそよ風のふく
五月来ぬわすれな草もわが恋も今しほのかににほひづるらむ
刈麦のにほひに雲もうす黄なる野薔薇のかげの夏の日の恋
うかれ女のうすき恋よりかきつばたうす紫に匂ひそめけむ`}
      author={"芥川龍之介"}
    />
  </Container>
);

export default Template;
