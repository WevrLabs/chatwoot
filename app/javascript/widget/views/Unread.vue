<template>
  <div class="unread-wrap">
    <div class="close-unread-wrap">
      <button
        v-if="showCloseButton"
        class="button small close-unread-button"
        @click="closeFullView"
      >
        <i class="ion-close-round" />
        {{ $t('UNREAD_VIEW.CLOSE_MESSAGES_BUTTON') }}
      </button>
    </div>
    <div class="unread-messages">
      <agent-bubble
        v-for="message in unreadMessages"
        :key="message.id"
        :message-id="message.id"
        :message="getMessageContent(message)"
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
import AgentBubble from 'widget/components/AgentMessageBubble.vue';
import configMixin from '../mixins/configMixin';

export default {
  name: 'Unread',
  components: {
    AgentBubble,
  },
  mixins: [configMixin],
  props: {
    unreadMessages: {
      type: Array,
      default: () => [],
    },
    conversationSize: {
      type: Number,
      default: 0,
    },
    availableAgents: {
      type: Array,
      default: () => [],
    },
    hasFetched: {
      type: Boolean,
      default: false,
    },
    conversationAttributes: {
      type: Object,
      default: () => {},
    },
    unreadMessageCount: {
      type: Number,
      default: 0,
    },
    hideMessageBubble: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    showCloseButton() {
      return this.unreadMessageCount && this.hideMessageBubble;
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
    background: $color-background;
    color: $color-gray;
    border: 0;
    font-weight: $font-weight-bold;
    font-size: $font-size-small;
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
  margin-top: auto;
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
    }
  }

  .close-unread-wrap {
    text-align: right;
  }
}
</style>
