import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import Reanimated, { ZoomIn, ZoomOut } from 'react-native-reanimated'
import { Feather } from '@expo/vector-icons'
import colors from "tailwindcss/colors";

interface Props extends TouchableOpacityProps {
  title: string
  checked?: boolean
}

export function Checkbox({ title, checked = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center"
      {...rest}
    >
      {
        checked
          ?
          <Reanimated.View
            className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
            entering={ZoomIn}
            exiting={ZoomOut}
          >
            <Feather
              name="check"
              size={20}
              color={colors.white}
            />
          </Reanimated.View>
          :
          <View className="h-8 w-8 bg-zinc-900 rounded-lg" />
      }

      <Text className="text-white font-semibold text-base ml-3">
        {title}
      </Text>
    </TouchableOpacity>
  )
}
