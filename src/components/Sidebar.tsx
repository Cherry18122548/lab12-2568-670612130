import { NavLink as RouterNavLink } from "react-router-dom";
import {
  NavLink,
  Stack,
  Box,
  Avatar,
  Indicator,
  Text,
  Group,
} from "@mantine/core";

interface SidebarComponentProps  {
  userName: string;
  avatarSrc: string;       
  userType?: string;       
}

export default function Sidebar({
  userName,
  avatarSrc,
  userType = "Admin",
}: SidebarComponentProps) {
  return (
    <Stack
      align="stretch"
      justify="space-between"
      gap="md"
      h="100vh"
    >
      {/* Menu */}
      <Box>
        <NavLink label="Home"  color="cyan" component={RouterNavLink} to="/" />
        <NavLink label="About" color="cyan" component={RouterNavLink} to="/about" />
      </Box>

      {/* ผู้ใช้งาน (ก้น Sidebar) */}
      <Box px="md" py={8} style={{ borderTop: "1px solid var(--mantine-color-gray-3)" }}>
        <Group gap="sm" align="center" wrap="nowrap">
           <Indicator inline size={16} offset={7} position="bottom-end" color="red" withBorder>
            <Avatar
            size="lg"
            radius="xl"
            src="12.jpg"
            />
          </Indicator>

          <Text size="sm" fw={500} style={{ whiteSpace: "nowrap" }}>
            User : {userName}{userType ? ` : ${userType}` : ""}
          </Text>
        </Group>
      </Box>
    </Stack>
  );
}
