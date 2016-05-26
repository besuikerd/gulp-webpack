module Main exposing (..)

import Html exposing (..)
import Html.App as App exposing (..)

main : Program Never
main = App.program
  { init = init
  , update = update
  , view = view
  , subscriptions = subscriptions
  }

type Msg
  = NoOp

type alias Model =
  {
  }

init : (Model, Cmd Msg)
init =
  ( Model
  , Cmd.none
  )

subscriptions : Model -> Sub Msg
subscriptions model = Sub.none

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    NoOp -> (model, Cmd.none)

view : Model -> Html Msg
view model = div [] [ text "Hello from Elm" ]
