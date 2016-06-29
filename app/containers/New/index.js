// TODO: This needs to be cleaned up

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {transitionTo} from 'react-router';
import React, { Component } from 'react';
import Helmet from "react-helmet";
import * as UserActions from '../../actions/user';
import Wrap from '../../components/Wrap';
import A from '../../components/A';
import TopNav from '../../components/TopNav';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import H1 from '../../components/H1';
import P from '../../components/P';
import Select from '../../components/Select';
import TagInput from '../../components/TagInput';
import 'draft-js-emoji-plugin/lib/plugin.css';
import styles from './styles.css';

import create_post from '../../utils/create_post.js';


// load theme styles with webpack 
import {stateToHTML} from 'draft-js-export-html';
import Editor, {RichUtils, createEditorStateWithText} from 'draft-js-plugins-editor';
import createCounterPlugin from 'draft-js-counter-plugin';

const counterPlugin = createCounterPlugin();

// Extract a counter from the plugin.
const { WordCounter } = counterPlugin;

import createRichButtonsPlugin from 'draft-js-richbuttons-plugin';
const richButtonsPlugin = createRichButtonsPlugin();

const {
  // inline buttons
  ItalicButton, BoldButton, MonospaceButton, UnderlineButton,
  // block buttons
  ParagraphButton, H1Button, H2Button, ULButton, OLButton
} = richButtonsPlugin;

const plugins = [counterPlugin, richButtonsPlugin];

const StyleButton = ({iconName, toggleInlineStyle, isActive, label, inlineStyle, onMouseDown }) =>
  <a onClick={toggleInlineStyle} className={styles.controls_button} onMouseDown={onMouseDown}>
    <span
      toolTip={label}
      style={{ color: isActive ? '#3ba2e0' : '#777' }}>
      {iconName}
    </span>
  </a>;

const BlockButton = ({iconName, toggleBlockType, isActive, label, blockType, onMouseDown }) =>
  <a onClick={toggleBlockType} className={styles.controls_button} onMouseDown={onMouseDown}>
    <span
      toolTip={label}
      style={{ color: isActive ? '#3ba2e0' : '#777' }}>
      {iconName}
    </span>
  </a>;

class New extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: createEditorStateWithText(''),
      title: '',
      fixed: false,
      show_modal: false
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({ editorState });
  }

  componentDidMount() {
    this.focus();
  }

  render() {
    const {editorState} = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <Wrap>
        <Helmet title={`Editing ${this.state.title || 'Untitled'}`} />
        <TopNav />
        <input type='text' ref='titleInput' className={styles.titleInput} placeholder={'Title'} value={this.state.title} onChange={(e) => this.setState({ title: e.target.value }) } />
        <div className={className} onClick={this.focus}>
          <Editor
            editorState={editorState}
            onChange={this.onChange}
            placeholder='Tell your story...'
            ref='editor'
            spellCheck={true}
            plugins={ plugins }
            />
        </div>
        <div className={styles.controls_wrap}>
          <Wrap style={{display: 'flex'}}>
            <BoldButton><StyleButton iconName='Bold'/></BoldButton>
            <ItalicButton><StyleButton iconName='Italic'/></ItalicButton>
            <UnderlineButton><StyleButton iconName='Underline'/></UnderlineButton>
            <ParagraphButton><BlockButton iconName='P'/></ParagraphButton>
            <H1Button><BlockButton iconName='H1'/></H1Button>
            <H2Button><BlockButton iconName='H2'/></H2Button>
            <ULButton><BlockButton iconName='UL'/></ULButton>
            <OLButton><BlockButton iconName='OL'/></OLButton>
            <div className={styles.controls_wrap_action__right}>
              <WordCounter /> words
              <Button disabled={!contentState.hasText()} onClick={() => this.setState({show_modal: true})} style={{display: 'inline-block', marginTop: '3px', marginLeft: '10px', width: 'auto'}}>Publish</Button>
            </div>
          </Wrap>
        </div>
        <Modal show={this.state.show_modal} onBackDropClick={() => this.setState({show_modal: false})}>
          <H1>Publish</H1>
          <P style={{marginTop: '15px'}}>Once you publish this story you will not be able to edit in sMedium. If you want to add images and links, save this story as a draft, and edit the story in your browser.</P>
          <P style={{marginTop: '15px'}}>Publish as a 
            <Select onChange={(e) => {this.setState({status: e.target.value})}}>
              <option value="">choose one</option>
              <option value="DRAFT">draft</option>
              <option value="PUBLIC">public</option>
              <option value="UNLISTED">unlisted</option>
            </Select>
            story.
          </P>
          <div>
            <P style={{display: 'inline-block'}}>Tags: </P>
            <TagInput onChange={(tags) => this.setState({tags: tags})} />
          </div>
          <Button style={{marginTop: '15px'}} onClick={() => {
            create_post({title: this.state.title, html: stateToHTML(contentState), tags: this.state.tags, status: this.state.status}, (post) => {
              transitionTo('/');
            });
          }}>Publish</Button>
        </Modal>
      </Wrap>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(UserActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(New);