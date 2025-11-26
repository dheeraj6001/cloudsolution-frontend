import MCQ from './MCQ';
import MAQ from './MAQ';
import NAT from './NAT';
import TrueFalse from './TrueFalse';


const QuestionForm = ({ type, config }: { type: string; config: any }) => {
  switch (type) {
    case 'MCQ':
      return <MCQ config={config} />;
    case 'MAQ':
      return <MAQ config={config} />;
    case 'NAT':
      return <NAT config={config} />;
    case 'TRUE_FALSE':
      return <TrueFalse config={config} />;
    default:
      return <div className="text-red-500">Invalid question type selected</div>;
  }
};

export default QuestionForm;
