<template>
  <div class="unread-wrap">
    <div class="close-unread-wrap">
      <button
        v-if="showCloseButton"
        class="button small close-unread-button"
        @click="closeFullView"
      >
        <i class="ion-android-close" />
        {{ $t('UNREAD_VIEW.CLOSE_MESSAGES_BUTTON') }}
      </button>
    </div>
    <div class="unread-messages">
      <unread-message
        v-for="(message, index) in allMessages"
        :key="message.id"
        :message-type="message.messageType"
        :message-id="message.id"
        :show-sender="!index"
        :sender="message.sender"
        :message="getMessageContent(message)"
        :campaign-id="message.campaignId"
      />
    </div>

    <div>
      <button
        v-if="unreadMessageCount"
        class="button clear-button"
        @click="openFullView"
      >
        <i class="ion-arrow-right-c" />
        {{ $t('UNREAD_VIEW.VIEW_MESSAGES_BUTTON') }}
      </button>
    </div>
  </div>
</template>

<script>
import { IFrameHelper } from 'widget/helpers/utils';
import UnreadMessage from 'widget/components/UnreadMessage.vue';

import configMixin from '../mixins/configMixin';
import { mapGetters } from 'vuex';

export default {
  name: 'Unread',
  components: {
    UnreadMessage,
  },
  mixins: [configMixin],
  props: {
    hasFetched: {
      type: Boolean,
      default: false,
    },
    unreadMessageCount: {
      type: Number,
      default: 0,
    },
    hideMessageBubble: {
      type: Boolean,
      default: false,
    },
    showUnreadView: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      unreadMessages: 'conversation/getUnreadTextMessages',
      campaign: 'campaign/getActiveCampaign',
    }),
    showCloseButton() {
      return this.unreadMessageCount;
    },
    sender() {
      const [firstMessage] = this.unreadMessages;
      return firstMessage.sender || {};
    },
    allMessages() {
      if (this.showUnreadView) {
        return this.unreadMessages;
      }
      const { sender, id: campaignId, message: content } = this.campaign;
      return [
        {
          content,
          sender,
          campaignId,
        },
      ];
    },
  },
  methods: {
    openFullView() {
      bus.$emit('on-unread-view-clicked');
    },
    closeFullView() {
      if (IFrameHelper.isIFrame()) {
        IFrameHelper.sendMessage({
          event: 'toggleBubble',
        });
      }
    },
    getMessageContent(message) {
      const { attachments, content } = message;
      const hasAttachments = attachments && attachments.length;

      if (content) return content;

      if (hasAttachments) return `📑`;

      return '';
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~widget/assets/scss/variables';

.unread-wrap {
  width: 100%;
  height: 100%;
  max-height: 100vh;
  background: transparent;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-end;
  overflow: hidden;
  padding: 10px 15px 0px;

  .unread-messages {
    padding-bottom: $space-small;
  }

  .clear-button {
    background: #fff;
    color: $color-woot;
    padding: 0;
    border: 0;
    font-weight: $font-weight-bold;
    font-size: $font-size-medium;
    transition: all .2s cubic-bezier(0.42, 0, 0.29, 0.83);
    margin-left: $space-smaller;
    padding: 7px 14px 7px 10px;
    box-shadow: -10px -7px 20px 0px rgba(0, 0, 0, 0.15);
    overflow: visible;
    margin-bottom: 10px;
    border-radius: 5px;

    &:hover {
      transform: translateX($space-smaller);
      color: $color-primary-dark;
    }
  }

  .close-unread-button {
    background: rgb(245 212 214);
    color: #000000;
    border: 0;
    transition: all .2s cubic-bezier(0.42, 0, 0.29, 0.83);
    font-weight: $font-weight-medium;
    font-size: $font-size-mini;
    transition: all .2s cubic-bezier(0.42, 0, 0.29, 0.83);
    margin-bottom: $space-slab;
    border-radius: $space-normal;

    &:hover {
      color: $color-body;
    }
  }

  .close-unread-wrap {
    text-align: left;
  }
}
</style>

<style lang="scss">
@import '~widget/assets/scss/variables';

.unread-messages {
  width: 100%;
  margin-top: 0;
  padding-bottom: $space-small;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow: visible;
  padding: 10px 15px 0;

  .chat-bubble-wrap {
    margin-bottom: 0.55rem;

    &:first-child {
      margin-top: auto;
    }
    .chat-bubble {
      background: #fff;
      box-shadow: -4px 5px 20px 0px rgba(0, 0, 0, 0.15);
      z-index: 999999 !important;
      border: none !important;
      position: relative;
      left: 10px;
      overflow: visible;
      border-radius: 4px !important;
      transition: all .2s cubic-bezier(0.42, 0, 0.29, 0.83);

      &:hover {
          transform: translateX(.25rem);
      }
      .message-content {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }
}

.is-widget-right .unread-wrap {
  text-align: right;
  overflow: hidden;

  .chat-bubble-wrap {
    .chat-bubble {
      background: #fff;
      box-shadow: -4px 5px 20px 0px rgba(0, 0, 0, 0.15);
      z-index: 99999 !important;
      border: none !important;
      position: relative;
      right: 10px;
      overflow: visible;
      border-radius: 4px !important;
      transition: all .2s cubic-bezier(0.42, 0, 0.29, 0.83);
      text-align: start !important;
      unicode-bidi: plaintext;

      &:hover {
          transform: translateX(.25rem);
      }
      .message-content {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }

  .close-unread-wrap {
    text-align: right;
  }
}
</style>
