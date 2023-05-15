import Navhome from '../../components/Home/Navhome';
import ModalComponent from '../../components/Plan/ModalComponent';
import AccordionTest from '../../components/Plan/Accordion';
import './Plan.css';

export default function Plan() {
  return (
    <>
      <Navhome hideLinks={false} />
      <ModalComponent />
      <AccordionTest />
    </>
  );
}
