<template>
  <div
    class="chat-bubble user"
    :style="{ background: widgetColor }"
    v-html="formatMessage(message, false)"
  />
</template>

<script>
import messageFormatterMixin from 'shared/mixins/messageFormatterMixin';

export default {
  name: 'UserMessageBubble',
  mixins: [messageFormatterMixin],
  props: {
    message: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: '',
    },
    widgetColor: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss">
@import '~widget/assets/scss/variables.scss';
@import '~widget/assets/scss/mixins.scss';

.chat-bubble {
  @include light-shadow;
  background: $color-woot;
  border-radius: $space-two;
  color: $color-white;
  display: inline-block;
  font-size: $font-size-default;
  line-height: 1.5;
  padding: $space-slab $space-normal $space-slab $space-normal;
  text-align: left;
  word-break: break-word;
  text-align: start;
  unicode-bidi: plaintext;
  max-width: 100%;

  > a {
    color: $color-primary;
    word-break: break-all;
  }

  .link {
    text-decoration: underline;
  }

  &.user {
    border-bottom-right-radius: $space-smaller;

    > a {
      color: $color-white;
    }
  }
}
</style>
<style lang="scss" scoped>
@import '~widget/assets/scss/variables.scss';

.chat-bubble.user::v-deep pre {
  background: $color-primary-light;
  color: $color-body;
  overflow: scroll;
  padding: $space-smaller;

  blockquote {
    text-align: start !important;
    unicode-bidi: plaintext;
  }
  dd {
    text-align: start !important;
    unicode-bidi: plaintext;
  }
  dl {
    text-align: start !important;
    unicode-bidi: plaintext;
  }
  figure {
    text-align: start !important;
    unicode-bidi: plaintext;
  }
  h1 {
    text-align: start !important;
    unicode-bidi: plaintext;
  }
  h2 {
    text-align: start !important;
    unicode-bidi: plaintext;
  }
  h3 {
    text-align: start !important;
    unicode-bidi: plaintext;
  }
  h4 {
    text-align: start !important;
    unicode-bidi: plaintext;
  }
  h5 {
    text-align: start !important;
    unicode-bidi: plaintext;
  }
  h6 {
    text-align: start !important;
    unicode-bidi: plaintext;
  }
  p {
    text-align: start !important;
    unicode-bidi: plaintext;
  }
  pre {
    text-align: start !important;
    unicode-bidi: plaintext;
  }
}
</style>
