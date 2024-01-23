import PageLayout from "@/components/Layout/PageLayout";
import Chat from "@/components/Chat/Chat";
import ChatPopup from "@/components/Chat/ChatPopup";
import React from "react";

import "/resources/styles/components/chat/chat.scss"

export default function ChatTest() {
  return (
    <PageLayout>
        <div>
          <ChatPopup>

          </ChatPopup>
        </div>
    </PageLayout>
  );
};
