<template>
  <div class="px-4">
    <div class="flex items-center justify-between mb-4">
      <div class="text-black-700">
        <div class="text-base leading-5 font-medium mb-1">
          <span class="availability-status" v-if="isOnline">We Are Online</span>
          <span class="availability-status" v-else>Currently Away</span>
          <div
            :class="
              `status-view--badge rounded-full leading-4 ${
                isOnline ? 'bg-green-500' : 'bg-orange-500'
              }`
            "
          />
        </div>
        <div class="text-xs leading-4 mt-1">
          <span class="reply-eta" v-if="isOnline">Average response time is 30 minutes</span>
          <span class="reply-eta" v-else>We'll get back to you in a few hours</span>
        </div>
      </div>
      <available-agents v-if="isOnline" :agents="availableAgents" />
    </div>
    <custom-button
      class="font-medium"
      block
      :bg-color="widgetColor"
      :text-color="textColor"
      @click="startConversation"
    >
      {{ $t('START_CONVERSATION') }}
    </custom-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getContrastingTextColor } from '@chatwoot/utils';
import AvailableAgents from 'widget/components/AvailableAgents.vue';
import CustomButton from 'shared/components/Button';
import configMixin from 'widget/mixins/configMixin';
import availabilityMixin from 'widget/mixins/availability';

export default {
  name: 'TeamAvailability',
  components: {
    AvailableAgents,
    CustomButton,
  },
  mixins: [configMixin, availabilityMixin],
  props: {
    availableAgents: {
      type: Array,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters({ widgetColor: 'appConfig/getWidgetColor' }),
    textColor() {
      return getContrastingTextColor(this.widgetColor);
    },
    isOnline() {
      const { workingHoursEnabled } = this.channelConfig;
      const anyAgentOnline = this.availableAgents.length > 0;

      if (workingHoursEnabled) {
        return this.isInBetweenTheWorkingHours;
      }
      return anyAgentOnline;
    },
    replyWaitMeessage() {
      const { workingHoursEnabled } = this.channelConfig;

      if (this.isOnline) {
        return this.replyTimeStatus;
      }
      if (workingHoursEnabled) {
        return this.outOfOfficeMessage;
      }
      return '';
    },
  },
  methods: {
    startConversation() {
      this.$emit('start-conversation');
    },
  },
};
</script>

<style scoped lang="scss">

.text-base {
  display: inline-flex;
}
.status-view--badge {
    height: .75rem;
    width: .75rem;
    margin-top: 5px;
    margin-left: 8px;
}
.status-view--badge.bg-green-500 {
    animation: pulse-g 2s infinite;
}
@keyframes pulse-g {
  0% {
    transform: scale(0.85);
    box-shadow: 0 0 0 0 #08bb13;
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px transparent;
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 transparent;
  }
}


.status-view--badge.bg-orange-500 {
  background-color: #ffbc00;
  animation: pulse-o 2s infinite;
}
@keyframes pulse-o {
  0% {
    transform: scale(0.9);
    box-shadow: 0 0 0 0 #efb921;
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px transparent;
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 transparent;
  }
}
</style>
