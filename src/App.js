
import './App.css';
import CustomButton from './Component/CustomButton';
import CustomInput from './Component/CustomInput';
import Header from './Component/Header';
import Card from './Component/Card';
import { useState } from 'react';
import jsPDF from 'jspdf';

function App() {
    const [add, setAdd] = useState(false);
    const [Tasks, setTasks] = useState([]);
    const [singleTask, setSingleTask] = useState('');
    const [singleDes, setSingleDes] = useState('');

    const UpdateTask = (id) => {
        setTasks(
            Tasks.map((t) => (t.id === id ? { ...t, complete: true } : t))
        );
    };

    const deleteTask = (id) => {
        setTasks(Tasks.filter((t) => (t.id === id ? false : true)));
    };

    const addToCard = () => {
        const trimmedTask = singleTask ? singleTask.trim() : '';
        const trimmedDes = singleDes ? singleDes.trim() : '';

        if (!trimmedTask || !trimmedDes) {
            return;
        }

        const id = Tasks.length > 0 ? Tasks[Tasks.length - 1].id + 1 : 1;
        const taskDetail = {
            id: id,
            task: trimmedTask,
            des: trimmedDes,
            complete: false,
        };

        setTasks([...Tasks, taskDetail]);
        setSingleTask('');
        setSingleDes('');
    };

    const ClearInput = () => {
        setSingleTask('');
        setSingleDes('');
    };

    const handleCustomTask = (event) => {
        setSingleTask(event.target.value);
    };

    const handleCustomDes = (event) => {
        setSingleDes(event.target.value);
    };

    const handleInput = () => {
        setAdd(!add);
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        let yPos = 10;

        Tasks.forEach((task) => {
            doc.text(10, yPos, `Task: ${task.task}`);
            yPos += 10;
            doc.text(10, yPos, `Description: ${task.des}`);
            yPos += 20; // Increase spacing between tasks
        });

        doc.save('tasks.pdf');
    };

    return (
        <div className='main'>
            <div className='inputSection'>
                <Header handleInput={handleInput} />
                {add == true ? (
                    <>
                        <CustomInput
                            value={singleTask}
                            placeHolder='Enter Task'
                            name='Task'
                            change={handleCustomTask}
                        />
                        <CustomInput
                            value={singleDes}
                            placeHolder='Enter Description'
                            name='Description'
                            change={handleCustomDes}
                        />
                        <div className='btnwrapper'>
                            <CustomButton
                                color='White'
                                bg='#1877F2'
                                name='Save Task'
                                click={addToCard}
                            />
                            <CustomButton
                                color='White'
                                bg='red'
                                name='Cancel'
                                click={ClearInput}
                            />
                        </div>
                    </>
                ) : null}
            </div>

            <div className='cardSection'>
                {Tasks.map((t) => (
                    <Card
                        title={t.task}
                        des={t.des}
                        key={t.id}
                        delete={() => deleteTask(t.id)}
                        update={() => UpdateTask(t.id)}
                        complete={t.complete}
                    />
                ))}
            </div>

            <div>
                <button onClick={generatePDF}>Download PDF</button>
            </div>
        </div>
    );
}

export default App;
