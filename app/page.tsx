import CardDiarys from "@/components/global/(diarys)/CardDiarys";
import Wrapper from "@/components/global/Wrapper";

export const revalidate = 0;
export default function page() {
  return (
    <Wrapper title="W Diary">
      <CardDiarys />
    </Wrapper>
  );
}
