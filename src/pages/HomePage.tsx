import { useState } from "react";
import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Card,
  Group,
  Checkbox,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { LoremIpsum } from "lorem-ipsum";
import { randomId } from "@mantine/hooks";
import { v4 as uuidv4 } from "uuid";

interface Task {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
  dueDate: Date | null;
  doneAt: Date | null; 
}

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Read a book", description: "Vite + React + Mantine + TS", isDone: false, dueDate: new Date(), doneAt: null },
    { id: "2", title: "Write code", description: "Finish project for class", isDone: false, dueDate: new Date(), doneAt: null },
    { id: "3", title: "Deploy app", description: "Push project to GitHub Pages", isDone: false, dueDate: new Date(), doneAt: null },
  ]);

  const { colorScheme, setColorScheme } = useMantineColorScheme(); // 👈 ใช้สลับธีม

  const lorem = new LoremIpsum({
    sentencesPerParagraph: { max: 8, min: 4 },
    wordsPerSentence: { max: 16, min: 4 },
  });

  const handleAdd = () => {
    const newTask: Task = {
      id: uuidv4(),
      title: randomId(),
      description: lorem.generateWords(10),
      isDone: false,
      dueDate: new Date(),
      doneAt: null,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const toggleDoneTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, isDone: !t.isDone, doneAt: !t.isDone ? new Date() : null }
          : t
      )
    );
  };

  // ✅ สี “Done at” ตามธีม: Light -> ม่วง / Dark -> เหลือง
  const doneColor = colorScheme === "dark" ? "yellow.5" : "violet.5";

  return (
    <Container size="sm" py="lg">
      <Stack align="center">
        <Title order={2}>Todo List</Title>

        {/* ปุ่มสลับธีมให้เห็นผลตามข้อ 3.2 */}

        <Text size="sm" c="dimmed">
          All : {tasks.length} | Done : {tasks.filter((t) => t.isDone).length}
        </Text>

        <Button
          onClick={handleAdd}
          styles={{ root: { backgroundColor: "#12B8C8", color: "white" } }}
          >
        Add Task
        </Button>



        <Stack w="100%">
          {tasks.map((task) => (
            <Card withBorder shadow="sm" radius="md" mb="sm" key={task.id}>
              <Group justify="space-between" align="flex-start">
                <Stack>
                  <Text fw={600} td={task.isDone ? "line-through" : "none"} size="lg">
                    {task.title}
                  </Text>

                  <Text size="sm" c="dimmed">
                    {task.description}
                  </Text>

                  {task.dueDate && (
                    <Text size="xs" c="gray">
                      Due: {task.dueDate.toLocaleDateString()}
                    </Text>
                  )}

                  {/* ✅ แสดง Date & Time เมื่อทำสำเร็จ ด้วยสีตามธีม */}
                  {task.isDone && task.doneAt && (
                    <Text size="xs" c={doneColor}>
                      Done at: {task.doneAt.toLocaleString()}
                    </Text>
                  )}
                </Stack>

                <Group>
                  <Checkbox
                    label="Done"
                    checked={task.isDone}
                    onChange={() => toggleDoneTask(task.id)}
                  />
                  <ActionIcon
                    variant="light"
                    color="red"
                    aria-label="Delete task"
                    onClick={() => deleteTask(task.id)}
                  >
                    <IconTrash size={18} />
                    </ActionIcon>
                </Group>
              </Group>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
