import React, { FC } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from '../providers';
import { OptionIcon, Options } from './options.component';
import { InputNative } from '../core/native';
import { useEvents } from '../providers/events.provider';

export const QueryPanel: FC<{}> = () => {

  const { colors } = useTheme();

  const {
    onQuery,
    onSubmit,
    onArrowUp,
    onArrowDown,
    onEscape,
    onCommandComma,
    onTab,
    onBackspace,
    options,
    loading,
    query,
    hoveredOptionIndex,
    shouldShowOptions,
    selectedOption,
  } = useEvents();

  return <>
    <SafeAreaView>
      <View style={{
        backgroundColor: colors.background,
        ...styles.input,
        ...(options?.length && shouldShowOptions ? styles.inputWithResults : {}),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        {
          selectedOption ?
          // TODO: Create component
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.active.highlight,
              paddingLeft: 10,
              paddingRight: 10,
              borderRadius: 10,
              marginRight: 5,
              padding: 5,
            }}>
              <OptionIcon style={{ paddingRight: 3 }} icon={selectedOption.icon}></OptionIcon>
              <Text style={{ fontSize: 16 }}>{selectedOption.title}</Text>
            </View>
          : null
        }
        <InputNative
          style={{ flex: 1 }}
          value={query}
          placeholder='Query...'
          hint={query?.length && options?.length ? options[0].title : ''}
          onChangeText={onQuery}
          onSubmit={onSubmit}
          onArrowDown={onArrowDown}
          onArrowUp={onArrowUp}
          onEscape={onEscape}
          onCommandComma={onCommandComma}
          onTab={onTab}
          onBackspace={onBackspace}
        ></InputNative>

        <View style={{marginLeft: 10}}>
          {loading
            ? <ActivityIndicator size="small" color={colors.active.highlight} style={{
              opacity: 0.3,
              right: 3,
              bottom: 0,
              top: 0,
              margin: 'auto',
              position: 'absolute',
              zIndex: 100,
            }} />
            : null
          }
          {options[hoveredOptionIndex] && <OptionIcon style={{}} icon={options[hoveredOptionIndex].icon}></OptionIcon>}
        </View>

      </View>
      {
        shouldShowOptions && <Options
          style={{ ...styles.options, backgroundColor: colors.background }}
          hoveredOptionIndex={hoveredOptionIndex}
          options={options}
          onSubmit={onSubmit}
        ></Options>
      }

    </SafeAreaView>
  </>
}

const styles = StyleSheet.create({
  inputWithResults: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  input: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
  },
  options: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
    paddingTop: 10,
    paddingBottom: 10,
    height: 510,
  },
});
