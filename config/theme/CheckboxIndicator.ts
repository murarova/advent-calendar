import { createStyle } from '@gluestack-style/react';

export const CheckboxIndicator = createStyle({
  'justifyContent': 'center',
  'alignItems': 'center',
  'borderColor': '$borderLight400',
  'bg': '$transparent',
  'borderRadius': 4,

  '_web': {
    ':focusVisible': {
      outlineWidth: '2px',
      outlineColor: '$green700',
      outlineStyle: 'solid',
      _dark: {
        outlineColor: '$green300',
      },
    },
  },

  ':checked': {
    borderColor: '$green500',
    bg: '$green500',
  },

  ':hover': {
    'borderColor': '$borderLight500',
    'bg': 'transparent',
    ':invalid': {
      borderColor: '$error700',
    },
    ':checked': {
      'bg': '$green700',
      'borderColor': '$green700',
      ':disabled': {
        'borderColor': '$green600',
        'bg': '$green600',
        'opacity': 0.4,
        ':invalid': {
          borderColor: '$error700',
        },
      },
    },
    ':disabled': {
      'borderColor': '$borderLight400',
      ':invalid': {
        borderColor: '$error700',
      },
    },
  },

  ':active': {
    ':checked': {
      bg: '$green800',
      borderColor: '$green800',
    },
  },
  ':invalid': {
    borderColor: '$error700',
  },
  ':disabled': {
    opacity: 0.4,
  },

  '_dark': {
    'borderColor': '$borderDark500',
    'bg': '$transparent',

    ':checked': {
      borderColor: '$green500',
      bg: '$green500',
    },
    ':hover': {
      'borderColor': '$borderDark400',
      'bg': 'transparent',
      ':invalid': {
        borderColor: '$error400',
      },
      ':checked': {
        'bg': '$green400',
        'borderColor': '$green400',
        ':disabled': {
          'borderColor': '$green500',
          'bg': '$green500',
          'opacity': 0.4,
          ':invalid': {
            borderColor: '$error400',
          },
        },
      },
      ':disabled': {
        'borderColor': '$borderDark500',
        ':invalid': {
          borderColor: '$error400',
        },
      },
    },
    ':active': {
      ':checked': {
        bg: '$green300',
        borderColor: '$green300',
      },
    },

    ':invalid': {
      borderColor: '$error400',
    },
    ':disabled': {
      opacity: 0.4,
    },
  },
});
